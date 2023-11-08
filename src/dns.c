#include "uv.h"
#include "utils.h"
#include "dns.h"


#define MAX_IP_CNT 8


static void duv_getaddrinfo_cb(uv_getaddrinfo_t* req,
                                  int status,
                                  struct addrinfo* res)
{
    int nargs = 0;
    duk_context *ctx = req->loop->data;
    duv_push_status(ctx, status);
    
    if (status == 0) {
        int loop = 0;
        int count = 0;
        struct addrinfo *address;
        char results[MAX_IP_CNT][INET6_ADDRSTRLEN];
        memset(results, 0, sizeof(results));
        
        /* ipv4 */
        address = res;
        while (address && count < MAX_IP_CNT) {
            if (address->ai_socktype == SOCK_STREAM &&
                address->ai_family == AF_INET) {
                if (!uv_inet_ntop(address->ai_family,
                               &((struct sockaddr_in*)(address->ai_addr))->sin_addr,
                               results[count],
                               INET6_ADDRSTRLEN))
                {
                    ++count;
                }
            }
            address = address->ai_next;
        }

        /* ipv6 */
        address = res;
        while (address && count < MAX_IP_CNT) {
            if (address->ai_socktype == SOCK_STREAM &&
                address->ai_family == AF_INET6) {
                if (!uv_inet_ntop(address->ai_family,
                               &((struct sockaddr_in6*)(address->ai_addr))->sin6_addr,
                               results[count],
                               INET6_ADDRSTRLEN))
                {
                    ++count;
                }
            }
            address = address->ai_next;
        }

        duk_idx_t arr_idx = duk_push_array(ctx);
        for (loop = 0; loop < count; ++loop) {
            duk_push_string(ctx, results[loop]);
            duk_put_prop_index(ctx, arr_idx, loop);
        }
        nargs = 2;
    }else {
        nargs = 1;
    }

    uv_freeaddrinfo(res);

    duv_fulfill_req(ctx, (uv_req_t*)req, nargs);
    req->data = duv_cleanup_req(ctx, req->data);
}

/*
 * arguments list:
 * hostname
 * family
 * flags
 * callback
 */
duk_ret_t duv_getaddrinfo(duk_context *ctx) {
    dschema_check(ctx, (const duv_schema_entry[]) {
        {"hostname", duk_is_string},
        {"family", duk_is_number},
        {"flags", duk_is_number},
        {"callback", duk_is_function},
        {NULL}
    });

    uv_getaddrinfo_t *req = duk_push_fixed_buffer(ctx, sizeof(uv_getaddrinfo_t));
    const char *hostname = duk_get_string(ctx, 0);
    int family = duk_get_int(ctx, 1);
    int flags = duk_get_int(ctx, 2);

    switch (family) {
        case 0:
            family = AF_UNSPEC;
            break;
        case 4:
            family = AF_INET;
            break;
        case 6:
            family = AF_INET6;
            break;
        default:
            duk_error(ctx, DUK_ERR_TYPE_ERROR, "Invalid family");
    }

    struct addrinfo hints;
    memset(&hints, 0, sizeof(struct addrinfo));
    hints.ai_family = family;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = flags;

    duv_check(ctx, uv_getaddrinfo(duv_loop(ctx),
                           req,
                           duv_getaddrinfo_cb,
                           hostname,
                           NULL,
                           &hints));

    /* 
     * callback
     */
    req->data = duv_setup_req(ctx, 3);
    
    return 0;
}

