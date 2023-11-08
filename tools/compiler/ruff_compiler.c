/*
 *  Very simple example program
 */
#include <sys/types.h>
#include <stdio.h>
#include <fcntl.h>

#ifdef _WIN32
#include <io.h>
#endif
#include "duktape.h"
#include "ruff_compiler.h"

#ifdef RUFF_COMPILER_COMPONENT
int ruff_compile(int argc, const char *argv[])
#else
int main(int argc, const char *argv[])
#endif
{
    unsigned char buffer[4096];
    duk_context *ctx;
    const char *fileName;
    int num=0;
    int count;
    duk_size_t out_size;
    const char *bytecode;

#ifdef _WIN32
	_setmode(_fileno(stdin), _O_BINARY);
	_setmode(_fileno(stdout), _O_BINARY);
#endif
    if (argc < 2) {
        fprintf(stderr, "file name needed!\n");
        exit(1);
    }
    fileName = argv[1];
    ctx = duk_create_heap_default();
    while((count = fread(buffer, 1, sizeof(buffer), stdin)) != 0) {
        duk_push_lstring(ctx, (const char *)buffer, count);
        num++;
    }
    duk_concat(ctx, num);

    duk_push_string(ctx, fileName);
    if (duk_pcompile(ctx, DUK_COMPILE_FUNCTION) != 0) {
        fprintf(stderr, "compile failed: %s\n", duk_safe_to_string(ctx, -1));
        exit(1);
    }
    duk_dump_function(ctx);
    bytecode = duk_get_buffer(ctx, -1, &out_size);
    fwrite(bytecode, 1, out_size, stdout);

    duk_destroy_heap(ctx);

    return 0;
}
