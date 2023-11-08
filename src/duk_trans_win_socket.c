/*
 *  Example debug transport using a TCP socket
 *
 *  The application has a server socket which can be connected to.
 *  After that data is just passed through.
 *
 *  NOTE: This is Linux specific on purpose, as it's just an example how
 *  a debug transport can be concretely implemented.
 */

#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <winsock2.h>
#include "duktape.h"
#include "duk_trans_socket.h"
static SOCKET server_sock;
static SOCKET client_sock;
/*
 *  Transport init and finish
 */

void duk_trans_socket_init(void) {
	int on;
    static int wsa_init = 0;
	struct sockaddr_in addr;

    if (!wsa_init) {
        WORD sockVersion = MAKEWORD(2,2);
        WSADATA wsaData;
        if(WSAStartup(sockVersion, &wsaData)!=0) {
            return 0;
        }
		wsa_init = 1;
    }
    server_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if(server_sock == INVALID_SOCKET) {
        printf("socket error !");
        return 0;
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(DUK_DEBUG_PORT);
    addr.sin_addr.S_un.S_addr = INADDR_ANY;
    if (bind(server_sock, (LPSOCKADDR) &addr, sizeof(addr)) == SOCKET_ERROR) {
		fprintf(stderr, "%s: failed to bind server socket: %s\n", __FILE__, strerror(errno));
		fflush(stderr);
		goto fail;
	}

	if (listen(server_sock, 1 /*backlog*/) == SOCKET_ERROR) {
        fprintf(stderr, "listen error !");
        fflush(stderr);
        goto fail;
    }
	return;
 fail:
	if (server_sock) {
		(void) closesocket(server_sock);
		server_sock = NULL;
	}
}

void duk_trans_socket_finish(void) {
	if (client_sock) {
		(void) closesocket(client_sock);
		client_sock = NULL;
	}
	if (server_sock) {
		(void) closesocket(server_sock);
		server_sock = NULL;
	}
}

void duk_trans_socket_waitconn(void) {
	struct sockaddr_in addr;
	int sz = sizeof(addr);

	if (server_sock < 0) {
		fprintf(stderr, "%s: no server socket, skip waiting for connection\n", __FILE__);
		fflush(stderr);
		return;
	}
	if (client_sock) {
		(void) closesocket(client_sock);
		client_sock = NULL;
	}

	fprintf(stderr, "Waiting for debug connection on port %d\n", (int) DUK_DEBUG_PORT);
	fflush(stderr);

	client_sock = accept(server_sock, (SOCKADDR *)&addr, &sz);
	if (client_sock == INVALID_SOCKET) {
		fprintf(stderr, "%s: accept() failed, skip waiting for connection: %s\n", __FILE__, strerror(errno));
		fflush(stderr);
		goto fail;
	}

	fprintf(stderr, "Debug connection established\n");
	fflush(stderr);

	/* XXX: For now, close the listen socket because we won't accept new
	 * connections anyway.  A better implementation would allow multiple
	 * debug attaches.
	 */

	if (server_sock) {
		(void) closesocket(server_sock);
		server_sock = NULL;
	}
	return;

 fail:
	if (client_sock) {
		(void) closesocket(client_sock);
		client_sock = NULL;
	}
}

/*
 *  Duktape callbacks
 */

/* Duktape debug transport callback: partial read */
duk_size_t duk_trans_socket_read_cb(void *udata, char *buffer, duk_size_t length) {
	int ret;

	(void) udata;  /* not needed by the example */

#if defined(DEBUG_PRINTS)
	fprintf(stderr, "%s: udata=%p, buffer=%p, length=%ld\n",
	        __func__, (void *) udata, (void *) buffer, (long) length);
	fflush(stderr);
#endif

	if (client_sock < 0) {
		return 0;
	}

	if (length == 0) {
		/* This shouldn't happen. */
		fprintf(stderr, "%s: read request length == 0, closing connection\n", __FILE__);
		fflush(stderr);
		goto fail;
	}

	if (buffer == NULL) {
		/* This shouldn't happen. */
		fprintf(stderr, "%s: read request buffer == NULL, closing connection\n", __FILE__);
		fflush(stderr);
		goto fail;
	}

	/* In a production quality implementation there would be a sanity
	 * timeout here to recover from "black hole" disconnects.
	 */

	ret = recv(client_sock, buffer, (size_t) length, 0);
	if (ret < 0) {
		fprintf(stderr, "%s: debug read failed, errno %d, closing connection: %s\n", __FILE__, errno, strerror(errno));
		fflush(stderr);
		goto fail;
	} else if (ret == 0) {
		fprintf(stderr, "%s: debug read failed, ret == 0 (EOF), closing connection\n", __FILE__);
		fflush(stderr);
		goto fail;
	} else if (ret > (int) length) {
		fprintf(stderr, "%s: debug read failed, ret too large (%ld > %ld), closing connection\n", __FILE__, (long) ret, (long) length);
		fflush(stderr);
		goto fail;
	}

	return (duk_size_t) ret;

 fail:
	if (client_sock) {
		(void) closesocket(client_sock);
		client_sock = NULL;
	}
	return 0;
}

/* Duktape debug transport callback: partial write */
duk_size_t duk_trans_socket_write_cb(void *udata, const char *buffer, duk_size_t length) {
	int ret;

	(void) udata;  /* not needed by the example */

#if defined(DEBUG_PRINTS)
	fprintf(stderr, "%s: udata=%p, buffer=%p, length=%ld\n",
	        __func__, (void *) udata, (void *) buffer, (long) length);
	fflush(stderr);
#endif

	if (!client_sock) {
		return 0;
	}

	if (length == 0) {
		/* This shouldn't happen. */
		fprintf(stderr, "%s: write request length == 0, closing connection\n", __FILE__);
		fflush(stderr);
		goto fail;
	}

	if (buffer == NULL) {
		/* This shouldn't happen. */
		fprintf(stderr, "%s: write request buffer == NULL, closing connection\n", __FILE__);
		fflush(stderr);
		goto fail;
	}

	/* In a production quality implementation there would be a sanity
	 * timeout here to recover from "black hole" disconnects.
	 */

	ret = send(client_sock, (const void *) buffer, (size_t) length, 0);
	if (ret <= 0 || ret > (int) length) {
		fprintf(stderr, "%s: debug write failed, closing connection: %s\n", __FILE__, strerror(errno));
		fflush(stderr);
		goto fail;
	}

	return (duk_size_t) ret;

 fail:
	if (client_sock) {
		(void) closesocket(client_sock);
		client_sock = -1;
	}
	return 0;
}

duk_size_t duk_trans_socket_peek_cb(void *udata) {
	int poll_rc;
	WSAPOLLFD fdarray[1];
	(void) udata;  /* not needed by the example */

	fdarray[0].fd = client_sock;
	fdarray[0].events = POLLRDNORM;
	fdarray[0].revents = 0;

#if defined(DEBUG_PRINTS)
	fprintf(stderr, "%s: udata=%p\n", __func__, (void *) udata);
	fflush(stderr);
#endif
    //not implemtn yet
	if (SOCKET_ERROR == (poll_rc = WSAPoll(&fdarray, 1, 0))) {
		fprintf(stderr, "%s: poll returned < 0, closing connection: %s\n", __FILE__, strerror(errno));
		fflush(stderr);
		goto fail;  /* also returns 0, which is correct */
	} else if (poll_rc > 1) {
		fprintf(stderr, "%s: poll returned > 1, treating like 1\n", __FILE__);
		fflush(stderr);
		return 1;  /* should never happen */
	} else if (poll_rc == 0) {
		return 0;  /* nothing to read */
	} else {
		return 1;  /* something to read */
	}

    return;

 fail:
	if (client_sock >= 0) {
		(void) close(client_sock);
		client_sock = -1;
	}
	return 0;
}

void duk_trans_socket_read_flush_cb(void *udata) {
#if defined(DEBUG_PRINTS)
	fprintf(stderr, "%s: udata=%p\n", __func__, (void *) udata);
	fflush(stderr);
#endif

	(void) udata;  /* not needed by the example */

	/* Read flush: Duktape may not be making any more read calls at this
	 * time.  If the transport maintains a receive window, it can use a
	 * read flush as a signal to update the window status to the remote
	 * peer.  A read flush is guaranteed to occur before Duktape stops
	 * reading for a while; it may occur in other situations as well so
	 * it's not a 100% reliable indication.
	 */

	/* This TCP transport requires no read flush handling so ignore.
	 * You can also pass a NULL to duk_debugger_attach() and not
	 * implement this callback at all.
	 */
}

void duk_trans_socket_write_flush_cb(void *udata) {
#if defined(DEBUG_PRINTS)
	fprintf(stderr, "%s: udata=%p\n", __func__, (void *) udata);
	fflush(stderr);
#endif

	(void) udata;  /* not needed by the example */

	/* Write flush.  If the transport combines multiple writes
	 * before actually sending, a write flush is an indication
	 * to write out any pending bytes: Duktape may not be doing
	 * any more writes on this occasion.
	 */

	/* This TCP transport requires no write flush handling so ignore.
	 * You can also pass a NULL to duk_debugger_attach() and not
	 * implement this callback at all.
	 */
	return;
}
