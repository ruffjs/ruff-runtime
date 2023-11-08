#include "ruff.h"
#include "utils.h"
#include "ruff_config.h"
#include "duk_trans_socket.h"
#include "ruff_native.h"
#include "ruff_buildin_js.h"
#include "ruff_compiler.h"

extern char **environ;

static int is_char_path_separator(char ch) {
	return (ch == PATH_SEPARATOR);
}

static void substr(char* dest, const char* str, int index, int len) {
	int str_len = strlen(str);
	int max_len = str_len - index;
	int i;

	if (len < 0 || len > max_len) {
		len = max_len;
	}

	for (i = 0; i < len; i++) {
		dest[i] = str[index + i];
	}

	dest[len] = '\0';
}

#ifndef PATH_MAX
#define PATH_MAX (8096)
#endif

const char* ruff_get_dirname(const char* path) {
	static char dirname[PATH_MAX];
	int len = strlen(path);
	int i;

	// we don't care about whether the last charactor is '/' or '\\',
	// so we start with len - 2.
	for (i = len - 2; i >= 0; i--) {
		if (is_char_path_separator(path[i])) {
			substr(dirname, path, 0, i);
			return dirname;
		}
	}

	return path;
}

const char* ruff_version(void) {
	return RUFF_VERSION;
}

const char *ruff_get_bootstrap_lcode(int *length) {
	if (!length) {
		return NULL;
	}
	*length = bootstrap_js_len;

	return (const char *) bootstrap_js;
}

duk_ret_t ruff_get_buildin_js(duk_context *ctx) {
	char *p_code = duk_push_fixed_buffer(ctx, buildin_js_len);
	memcpy(p_code, (const char *) buildin_js, buildin_js_len);
	return 1;
}

#ifdef DUK_USE_DEBUGGER_SUPPORT
static duk_idx_t debugger_request(duk_context *ctx, void *udata, duk_idx_t nvalues) {
	printf("debugger not supported yet\n");
    return -1;
}


static void debugger_detached(void *udata) {
	fprintf(stderr, "Debugger detached, udata: %p\n", (void *) udata);
	fflush(stderr);
}
#endif

void ruff_attach_debugger(duk_context *ctx) {
#ifdef DUK_USE_DEBUGGER_SUPPORT
	fprintf(stderr, "Debugger enabled, create socket and wait for connection\n");
	fflush(stderr);
	duk_trans_socket_init();
	duk_trans_socket_waitconn();
	fprintf(stderr, "Debugger connected, call duk_debugger_attach() and then execute requested file(s)/eval\n");
	fflush(stderr);
	duk_debugger_attach(ctx,
			duk_trans_socket_read_cb,
			duk_trans_socket_write_cb,
			duk_trans_socket_peek_cb,
			duk_trans_socket_read_flush_cb,
			duk_trans_socket_write_flush_cb,
            debugger_request,
			debugger_detached,
			(void *) 0xbeef1234);
#else
	fprintf(stderr, "please build with -DDUK_DEBUG=\"TRUE\"\n");
	fflush(stderr);
#endif
}

void ruff_handle_args(duk_context *ctx, const int argc, const char **argv, int *pArgv_arr_index) {
	int i;
	int j;
	const char *arg;

	if (argc < 2) {
		fprintf(stderr, "Usage: ruff script.js [--debugger]\n");
		exit(1);
	}

	if (pArgv_arr_index) {
		*pArgv_arr_index = duk_push_array(ctx);
	}

	for (i = 0, j = 0; i < argc; i++) {
		arg = argv[i];
		if (strcmp(arg, "-v" ) == 0 || strcmp(arg, "--version") == 0) {
			printf("%s\n", ruff_version());
			exit(0);
		}

		if (strcmp(arg, "--compile") == 0) {
			//just exit after done
			exit(ruff_compile(argc - i, &argv[i]));
		}

		if (strcmp(arg, "--debugger") == 0) {
			ruff_attach_debugger(ctx);
		} else if (pArgv_arr_index) {
			duk_push_string(ctx, arg);
			duk_put_prop_index(ctx, *pArgv_arr_index, j);
			j++;
		}
	}
}

void ruff_handle_env(duk_context *ctx, int *pEnv_arr_index) {
	int i = 0;
	char **env;

	if (pEnv_arr_index) {
		*pEnv_arr_index = duk_push_array(ctx);

		for (env = environ; *env; ++env) {
			duk_push_string(ctx, (*env));
			duk_put_prop_index(ctx, *pEnv_arr_index, i);
			i++;
		}
	}
}

int ruff_array_to_args(duk_context *ctx, const int array_index,
		char *buffer, const int buffer_len,
		char **args, const int args_len) {
	int args_index = 0;
	int buffer_index = 0;
	int len;
	duk_size_t sz;
	const char *ptr;

	memset(args, 0, sizeof(char*) * args_len);
	if (duk_is_array(ctx, array_index)) {
		duk_enum(ctx, array_index, DUK_ENUM_ARRAY_INDICES_ONLY);
		while (duk_next(ctx, -1,  1)) {
			if (args_index >= args_len) {
				fprintf(stderr, "exceed max args len %d\n", args_len);
				return DUK_RET_TYPE_ERROR;
			}
			ptr = duk_to_lstring(ctx, -1, &sz);
			if (buffer_index + sz >= buffer_len) {
				fprintf(stderr, "exceed buffer len %d\n", buffer_len);
				return DUK_RET_TYPE_ERROR;
			}
			len = snprintf(&buffer[buffer_index],
					(buffer_len - buffer_index),
					"%s", ptr);
			args[args_index++] = &buffer[buffer_index];
			buffer_index += ++len; //include the '\0'
			duk_pop_2(ctx);
		}
		//pop ... enum
		duk_pop(ctx);
	} else {
		fprintf(stderr, "expected to be array");
		return DUK_RET_TYPE_ERROR;
	}
	return args_index;
}

//TODO: Add signal handle

duk_ret_t ruff_exec_sync(duk_context *ctx) {
#ifndef _WIN32
    const char *fileName  = duk_get_string(ctx, 0);
    pid_t pid;
    int wait_value;
    char* args[16];
    char  buffer[256];
    int exit_value = -1;

    if (ruff_array_to_args(ctx, 1, buffer, sizeof(buffer),
                           &args[1],
                           (sizeof(args)/sizeof(char *) - 1)) < 0) {
        duk_error(ctx, DUK_ERR_ERROR, "failed to parse params");
    }
    args[0] = (char *)fileName;
    pid = vfork();

    if (pid == 0) {
        execv(fileName, args);
        _exit(-1); // must use _exit insteaf of exit, please see vfork manual
    } else if (pid == -1) {
        duk_error(ctx, DUK_ERR_ERROR, "fail when fork");
    }

    if (wait4(pid, &wait_value, 0, NULL) != -1) {
        if (WIFEXITED(wait_value)) {
            exit_value = WEXITSTATUS(wait_value);
        }
    }
    duk_push_int(ctx, exit_value);
    return 1;
#else
    duk_error(ctx, DUK_ERR_ERROR, "Not implement on this platfrom");
    return 0;
#endif
}

void ruff_dump_error(duk_context *ctx, duk_idx_t idx) {
	fprintf(stderr, "\nUncaught Exception:\n");
	if (duk_is_object(ctx, idx)) {
		duk_get_prop_string(ctx, -1, "stack");
		fprintf(stderr, "\n%s\n\n", duk_get_string(ctx, -1));
		duk_pop(ctx);
	}
	else {
		fprintf(stderr, "\nThrown Value: %s\n\n", duk_json_encode(ctx, idx));
	}
}

void _ruff_exit(duk_context *ctx, duk_int_t code, duk_int_t bypass_emit) {
	uv_loop_t *loop;
	duk_int_t rc;

	if (!bypass_emit) {
		duk_push_global_object(ctx);
		duk_get_prop_string(ctx, -1, "process");
		duk_push_string(ctx, "emit");
		duk_push_string(ctx, "exit");
		duk_push_int(ctx, code);
		rc = duk_pcall_prop(ctx, -4, 2);
		if (rc != DUK_EXEC_SUCCESS) {
			ruff_dump_error(ctx, -1);
			code = 1;
		}
	}
	loop = duv_loop(ctx);
	uv_loop_close(loop);
	duk_destroy_heap(ctx);
	exit(code);
}

duk_ret_t ruff_exit(duk_context *ctx) {
	duk_int_t code = duk_get_int(ctx, 0);
	duk_int_t bypass_emit = duk_get_int(ctx, 1);
	_ruff_exit(ctx, code, bypass_emit);
	// should not come here
	return 0;
}

duk_ret_t ruff_handle_fatal(duk_context *ctx) {
	const char *buf;
	duk_idx_t err_index;

	buf = duk_require_string(ctx, 0);
	err_index = duk_push_error_object(ctx, DUK_ERR_ERROR, "%s", buf);

	duk_push_global_object(ctx);
	duk_get_prop_string(ctx, -1, "process");
	duk_push_string(ctx, "_handleFatal");
	duk_dup(ctx, err_index);
	duk_call_prop(ctx, -3, 1);

	return 0;
}

duk_ret_t ruff_load_function(duk_context *ctx) {
	duk_load_function(ctx);
	return 1;
}

duk_ret_t ruff_dump_function(duk_context *ctx) {
	duk_compile(ctx, DUK_COMPILE_FUNCTION);
	duk_dump_function(ctx);
	return 1;
}

#define RUFF_DEF_SIG_CONST(sigid) { #sigid, (double) sigid }

duk_ret_t ruff_get_signal_const(duk_context *ctx) {

	const duk_number_list_entry signal_consts[] = {
#ifdef SIGHUP
		RUFF_DEF_SIG_CONST(SIGHUP),
#endif

#ifdef SIGINT
		RUFF_DEF_SIG_CONST(SIGINT),
#endif

#ifdef SIGQUIT
		RUFF_DEF_SIG_CONST(SIGQUIT),
#endif

#ifdef SIGILL
		RUFF_DEF_SIG_CONST(SIGILL),
#endif

#ifdef SIGTRAP
		RUFF_DEF_SIG_CONST(SIGTRAP),
#endif

#ifdef SIGABRT
		RUFF_DEF_SIG_CONST(SIGABRT),
#endif

#ifdef SIGIOT
		RUFF_DEF_SIG_CONST(SIGIOT),
#endif

#ifdef SIGBUS
		RUFF_DEF_SIG_CONST(SIGBUS),
#endif

#ifdef SIGFPE
		RUFF_DEF_SIG_CONST(SIGFPE),
#endif

#ifdef SIGKILL
		RUFF_DEF_SIG_CONST(SIGKILL),
#endif

#ifdef SIGUSR1
		RUFF_DEF_SIG_CONST(SIGUSR1),
#endif

#ifdef SIGSEGV
		RUFF_DEF_SIG_CONST(SIGSEGV),
#endif

#ifdef SIGUSR2
		RUFF_DEF_SIG_CONST(SIGUSR2),
#endif

#ifdef SIGPIPE
		RUFF_DEF_SIG_CONST(SIGPIPE),
#endif

#ifdef SIGALRM
		RUFF_DEF_SIG_CONST(SIGALRM),
#endif

		RUFF_DEF_SIG_CONST(SIGTERM),

#ifdef SIGCHLD
		RUFF_DEF_SIG_CONST(SIGCHLD),
#endif

#ifdef SIGSTKFLT
		RUFF_DEF_SIG_CONST(SIGSTKFLT),
#endif


#ifdef SIGCONT
		RUFF_DEF_SIG_CONST(SIGCONT),
#endif

#ifdef SIGSTOP
		RUFF_DEF_SIG_CONST(SIGSTOP),
#endif

#ifdef SIGTSTP
		RUFF_DEF_SIG_CONST(SIGTSTP),
#endif

#ifdef SIGBREAK
		RUFF_DEF_SIG_CONST(SIGBREAK),
#endif

#ifdef SIGTTIN
		RUFF_DEF_SIG_CONST(SIGTTIN),
#endif

#ifdef SIGTTOU
		RUFF_DEF_SIG_CONST(SIGTTOU),
#endif

#ifdef SIGURG
		RUFF_DEF_SIG_CONST(SIGURG),
#endif

#ifdef SIGXCPU
		RUFF_DEF_SIG_CONST(SIGXCPU),
#endif

#ifdef SIGXFSZ
		RUFF_DEF_SIG_CONST(SIGXFSZ),
#endif

#ifdef SIGVTALRM
		RUFF_DEF_SIG_CONST(SIGVTALRM),
#endif
#ifdef SIGPROF
		RUFF_DEF_SIG_CONST(SIGPROF),
#endif

#ifdef SIGWINCH
		RUFF_DEF_SIG_CONST(SIGWINCH),
#endif

#ifdef SIGIO
		RUFF_DEF_SIG_CONST(SIGIO),
#endif

#ifdef SIGPOLL
		RUFF_DEF_SIG_CONST(SIGPOLL),
#endif

#ifdef SIGLOST
		RUFF_DEF_SIG_CONST(SIGLOST),
#endif

#ifdef SIGPWR
		RUFF_DEF_SIG_CONST(SIGPWR),
#endif

#ifdef SIGINFO
		RUFF_DEF_SIG_CONST(SIGINFO),
#endif

#ifdef SIGSYS
		RUFF_DEF_SIG_CONST(SIGSYS),
#endif
#ifdef SIGUNUSED
		RUFF_DEF_SIG_CONST(SIGUNUSED),
#endif
		{ NULL, 0.0 }
	};

	duk_push_object(ctx);
	duk_put_number_list(ctx, -1, signal_consts);
	return 1;
}
