#include "utils.h"

uv_loop_t* duv_loop(duk_context *ctx) {
  duk_memory_functions funcs;
  duk_get_memory_functions(ctx, &funcs);
  return funcs.udata;
}

duv_handle_t* duv_setup_handle(duk_context *ctx) {
  duv_handle_t* data = duk_alloc(ctx, sizeof(*data));
  duk_push_this(ctx);
  data->context = duv_ref(ctx);
  duk_dup(ctx, -1);
  data->ref = duv_ref(ctx);
  data->callbacks[0] = 0;
  data->callbacks[1] = 0;
  return data;
}

duv_handle_t* duv_cleanup_handle(duk_context *ctx, duv_handle_t* data) {
  duv_unref(ctx, data->ref);
  duv_unref(ctx, data->context);
  duv_unref(ctx, data->callbacks[0]);
  duv_unref(ctx, data->callbacks[1]);
  duk_free(ctx, data);
  return NULL;
}

void duv_setup_req_dataref(duk_context *ctx, duv_req_t* data, int data_index) {
    duk_dup(ctx, data_index);
    data->data_ref = duv_ref(ctx);
}

duv_req_t* duv_setup_req(duk_context *ctx, int callback_index) {
  duv_req_t* data = duk_alloc(ctx, sizeof(*data));
  duk_push_this(ctx);
  data->context = duv_ref(ctx);
  duk_dup(ctx, -1);
  data->req_ref = duv_ref(ctx);
  if (duk_is_callable(ctx, callback_index)) {
    duk_dup(ctx, callback_index);
    data->callback_ref = duv_ref(ctx);
  }
  else {
    data->callback_ref = 0;
  }
  data->data_ref = 0;
  data->data = NULL;
  return data;
}

duv_req_t* duv_cleanup_req(duk_context *ctx, duv_req_t *data) {
  duv_unref(ctx, data->req_ref);
  duv_unref(ctx, data->context);
  duv_unref(ctx, data->callback_ref);
  duv_unref(ctx, data->data_ref);
  duk_free(ctx, data->data);
  duk_free(ctx, data);
  return NULL;
}


void duv_error(duk_context *ctx, int status) {
  duk_error(ctx, DUK_ERR_ERROR, "%s: %s", uv_err_name(status), uv_strerror(status));
}

int duv_push_status(duk_context *ctx, int status) {
  if (status < 0) {
    return duk_push_error_object(ctx, DUK_ERR_ERROR, "%s: %s", uv_err_name(status), uv_strerror(status));
  }
  duk_push_null(ctx);
  return 0;
}

void duv_check(duk_context *ctx, int status) {
  if (status < 0) duv_error(ctx, status);
}

void duv_store_handler(duk_context *ctx, duv_handle_t *data, int type, int index) {
  if (data->callbacks[type]) {
    duv_unref(ctx, data->callbacks[type]);
    data->callbacks[type] = 0;
  }

  if (!duk_is_function(ctx, index)) {
    return;
  }

  duk_dup(ctx, index);
  data->callbacks[type] = duv_ref(ctx);
}

/* NOTE:
 * `nextTick` implementation related
 * see modules/ruff_modules/ruffjs/startup.js
 */
static void duv_do_tick_callbacks(duk_context* ctx) {
    duk_push_global_object(ctx);
    duk_get_prop_string(ctx, -1, "process");
    duk_get_prop_string(ctx, -1, "_tickCallback");
    if (duk_is_function(ctx, -1) == 1) {
        duk_call(ctx, 0);
    }
    duk_pop_3(ctx);
}

/* NOTE:
 * stub for both `duv_emit_event` and `duv_fulfill_req`
 * all callbacks should happen right inside here
 */
static void duv_make_callback(duk_context *duk_ctx, int fn_ref, int data_context, int nargs) {
  if (fn_ref) {
    duv_push_ref(duk_ctx, fn_ref);
    if (nargs) {
      duk_insert(duk_ctx, -1 - nargs);
    }
    duv_push_ref(duk_ctx, data_context);
    if (nargs) {
      duk_insert(duk_ctx, -1 - nargs);
    }
    duk_call_method(duk_ctx, nargs);
    duk_pop(duk_ctx);
    duv_do_tick_callbacks(duk_ctx);
  }
  else if (nargs) {
    duk_pop_n(duk_ctx, nargs);
  }
}

void duv_emit_event(duk_context *ctx, duv_handle_t* data, duv_callback_id type, int nargs) {
  int fn_ref = data->callbacks[type];
  duv_make_callback(ctx, fn_ref, data->context, nargs);
}

void duv_fulfill_req(duk_context *ctx, uv_req_t* req, int nargs) {
  duv_req_t *data = req->data;
  int fn_ref = data->callback_ref;
  duv_make_callback(ctx, fn_ref, data->context, nargs);
}

void duv_get_data(duk_context *ctx, int index, uv_buf_t* buf) {
  if (duk_is_string(ctx, index)) {
    buf->base = (char*) duk_get_lstring(ctx, index, &buf->len);
  }
  else {
    buf->base = duk_get_buffer(ctx, index, &buf->len);
  }
}

void duv_push_sockaddr(duk_context *ctx, struct sockaddr_storage *address) {
  char ip[INET6_ADDRSTRLEN];
  int port = 0;
  if (address->ss_family == AF_INET) {
    struct sockaddr_in *addrin = (struct sockaddr_in *) address;
    uv_inet_ntop(AF_INET, &(addrin->sin_addr), ip, sizeof(ip));
    port = ntohs(addrin->sin_port);
  } else if (address->ss_family == AF_INET6) {
    struct sockaddr_in6 *addrin6 = (struct sockaddr_in6 *) address;
    uv_inet_ntop(AF_INET6, &(addrin6->sin6_addr), ip, sizeof(ip));
    port = ntohs(addrin6->sin6_port);
  }

  duk_push_object(ctx);
  duk_push_string(ctx, duv_protocol_to_string(address->ss_family));
  duk_put_prop_string(ctx, -2, "family");
  duk_push_number(ctx, port);
  duk_put_prop_string(ctx, -2, "port");
  duk_push_string(ctx, ip);
  duk_put_prop_string(ctx, -2, "address");
}

const char* duv_protocol_to_string(int family) {
#ifdef AF_UNIX
  if (family == AF_UNIX) return "UNIX";
#endif
#ifdef AF_INET
  if (family == AF_INET) return "INET";
#endif
#ifdef AF_INET6
  if (family == AF_INET6) return "INET6";
#endif
#ifdef AF_IPX
  if (family == AF_IPX) return "IPX";
#endif
#ifdef AF_NETLINK
  if (family == AF_NETLINK) return "NETLINK";
#endif
#ifdef AF_X25
  if (family == AF_X25) return "X25";
#endif
#ifdef AF_AX25
  if (family == AF_AX25) return "AX25";
#endif
#ifdef AF_ATMPVC
  if (family == AF_ATMPVC) return "ATMPVC";
#endif
#ifdef AF_APPLETALK
  if (family == AF_APPLETALK) return "APPLETALK";
#endif
#ifdef AF_PACKET
  if (family == AF_PACKET) return "PACKET";
#endif
  return NULL;
}
