#include "udp.h"

void alloc_buffer(size_t length, uv_buf_t *buf) {
    buf->base = malloc(length);
    buf->len = length;
}

void on_send(uv_udp_send_t *req, int status) {
    if (status) {
        fprintf(stderr, "Send error %s\n", uv_strerror(status));
        return;
    }
}

duk_ret_t duv_broadcast(duk_context *ctx) {
    const char *string;
    duk_size_t len;
    string = duk_get_lstring(ctx, 0, &len);
    uv_buf_t buffer;
    alloc_buffer(len, &buffer);
    memset(buffer.base, 0, buffer.len);
    int i;
    for (i = 0; i < len; ++i) {
        buffer.base[i] = string[i];
    }
    uv_udp_t send_socket;
    duv_check(ctx, uv_udp_init(duv_loop(ctx), &send_socket));
    struct sockaddr_in broadcast_addr;
    uv_ip4_addr("0.0.0.0", 0, &broadcast_addr);
    uv_udp_bind(&send_socket, (const struct sockaddr *) &broadcast_addr, 0);
    uv_udp_set_broadcast(&send_socket, 1);

    uv_udp_send_t send_req;
    struct sockaddr_in send_addr;
    uv_ip4_addr("255.255.255.255", 23333, &send_addr);
    uv_udp_send(&send_req, &send_socket, &buffer, 1,
                (const struct sockaddr *) &send_addr, on_send);
    uv_run(duv_loop(ctx), UV_RUN_DEFAULT);
    return 0;
}

duk_ret_t duv_new_udp(duk_context *ctx) {
    uv_udp_t *handle;

    handle = duk_push_fixed_buffer(ctx, sizeof(*handle));
    duv_check(ctx, uv_udp_init(duv_loop(ctx), handle));
    handle->data = duv_setup_handle(ctx);
    return 1;
}

duk_ret_t duv_udp_bind(duk_context *ctx) {
    uv_udp_t *handle;
    duk_size_t len;
    const char *addr;
    int bind_port;
    struct sockaddr_in udp_addr;

    handle = duk_require_buffer(ctx, 0, &len);
    if (len != sizeof(*handle)) {
        fprintf(stderr, "invalid udp handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    addr = duk_require_string(ctx, 1);
    bind_port = duk_get_int(ctx, 2);

    duv_check(ctx, uv_ip4_addr(addr, bind_port, &udp_addr));
    duv_check(ctx,
              uv_udp_bind(handle, (const struct sockaddr *) &udp_addr, UV_UDP_REUSEADDR));

    return 0;
}

duk_ret_t duv_udp_broadcast_to_port(duk_context *ctx) {
    uv_udp_t *handle;
    const char *data;
    duk_size_t len;
    uv_buf_t buffer;
    struct sockaddr_in broadcast_addr;
    int port;

    handle = duk_require_buffer(ctx, 0, &len);
    if (len != sizeof(*handle)) {
        fprintf(stderr, "invalid udp handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    data = duk_require_lstring(ctx, 1, &len);
    port = duk_require_int(ctx, 2);

    uv_udp_set_broadcast(handle, 1);
    uv_ip4_addr("255.255.255.255", port, &broadcast_addr);

    buffer = uv_buf_init((char *)data, len);
    uv_udp_try_send(handle, &buffer, 1, (const struct sockaddr *) &broadcast_addr);
    return 0;
}

duk_ret_t duv_udp_recv_start(duk_context *ctx) {
    uv_udp_t *handle;
    duk_size_t len;

    handle = duk_require_buffer(ctx, 0, &len);
    if (len != sizeof(*handle)) {
        fprintf(stderr, "invalid udp handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    duv_check(ctx, uv_udp_recv_start(handle, duv_alloc_cb, duv_udp_recv_cb));
    duv_store_handler(ctx, handle->data, DUV_RECV, 1);
    return 0;
}

duk_ret_t duv_udp_recv_stop(duk_context *ctx) {
    uv_udp_t *handle;
    duk_size_t len;

    handle = duk_require_buffer(ctx, 0, &len);
    if (len != sizeof(*handle)) {
        fprintf(stderr, "invalid udp handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    duv_check(ctx, uv_udp_recv_stop(handle));
    return 0;
}

duk_ret_t duv_udp_send(duk_context *ctx) {
    uv_udp_t *handle;
    duk_size_t len;
    struct sockaddr_storage addr;
    const char *host;
    int port;
    uv_buf_t buffer;
    uv_udp_send_t *send_req;

    handle = duk_require_buffer(ctx, 0, &len);
    if (len != sizeof(*handle)) {
        fprintf(stderr, "invalid udp handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    duv_get_data(ctx, 1, &buffer);
    host = duk_require_string(ctx, 2);
    port = duk_require_int(ctx, 3);
    // first, constructor ip4.
    if (uv_ip4_addr(host, port, (struct sockaddr_in *) &addr) != 0) {
        // then, constructor ip6.
        if (uv_ip6_addr(host, port, (struct sockaddr_in6 *) &addr) != 0) {
            duk_error(ctx, DUK_ERR_TYPE_ERROR, "Invalid IP address or port");
        }
    }

    send_req = duk_push_fixed_buffer(ctx, sizeof(*send_req));
    duv_check(ctx, uv_udp_send(send_req, handle, &buffer, 1,
                               (const struct sockaddr *) &addr, duv_udp_send_cb));
    send_req->data = duv_setup_req(ctx, 4);
    return 1;
}

duk_ret_t duv_udp_getsockname(duk_context *ctx) {
    uv_udp_t *handle;
    duk_size_t len;
    int addrlen;
    struct sockaddr_storage address;

    handle = duk_require_buffer(ctx, 0, &len);
    if (len != sizeof(*handle)) {
        fprintf(stderr, "invalid udp handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    addrlen = sizeof(address);
    duv_check(ctx, uv_udp_getsockname(handle, (struct sockaddr *) &address, &addrlen));
    duv_push_sockaddr(ctx, &address);
    return 1;
}

duk_ret_t duv_udp_setbroadcast(duk_context *ctx) {
    uv_udp_t *handle;
    duk_size_t len;
    duk_bool_t flag;

    handle = duk_require_buffer(ctx, 0, &len);
    if (len != sizeof(*handle)) {
        fprintf(stderr, "invalid udp handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    flag = duk_require_boolean(ctx, 1);
    duv_check(ctx, uv_udp_set_broadcast(handle, flag));
    return 0;
}
