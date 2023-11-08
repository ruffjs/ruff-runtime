CMAKE_MINIMUM_REQUIRED(VERSION 3.0)

IF(NOT "$ENV{RUFF_CMAKE_CC}" STREQUAL "")
    SET(CMAKE_C_COMPILER $ENV{RUFF_CMAKE_CC})

    IF("$ENV{RUFF_CMAKE_CC}" MATCHES "android")
        SET(CMAKE_SYSTEM_NAME Android)
        IF(NOT "$ENV{ANDROID_NDK_HOME}" STREQUAL "")
            SET(ANDROID_NDK_HOME $ENV{ANDROID_NDK_HOME})
        ELSE()
            MESSAGE(FATAL_ERROR "You MUST set ANDROID_NDK_HOME for Android build")
        ENDIF()
    ELSE()
        SET(CMAKE_SYSTEM_NAME Linux)
    ENDIF()

ENDIF()

MESSAGE(STATUS "CMAKE_C_COMPILER = ${CMAKE_C_COMPILER}")
PROJECT(ruff)
####################
#     CONFIG
####################

SET(RUFF_PROJECT YES)
SET(LIBRARY_INCLUDE_DIR "include")
SET(MAKE_COMMAND make)
SET(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/misc")
SET(RUFF_JS_MODULES_PATH "${PROJECT_SOURCE_DIR}/modules/ruff_modules")
SET(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -DRUFF_COMPILER_COMPONENT -fno-stack-check")
SET(SOCKLIB "")

IF("${CMAKE_SYSTEM_NAME}" MATCHES "Android")
    SET(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fPIE -pie")
ENDIF()

IF(NOT "$ENV{RUFF_CMAKE_ARCH}" STREQUAL "")
    string(TOUPPER "$ENV{RUFF_CMAKE_ARCH}" RUFF_CMAKE_ARCH)
    IF(${RUFF_CMAKE_ARCH} STREQUAL "ARM" OR "${RUFF_CMAKE_ARCH}" STREQUAL "MIPS")
        SET(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -rdynamic -Os -fdata-sections -ffunction-sections -Wl,--gc-sections")
    ELSEIF(${RUFF_CMAKE_ARCH} STREQUAL "X86")
        SET(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -m32")
    ENDIF()
ENDIF()

IF(MSVC)
    SET(SOCKLIB  "ws2_32")
ENDIF()

IF(NOT DEFINED RUFF_VERSION)
    SET(RUFF_VERSION "0.8.0")
ENDIF(NOT DEFINED RUFF_VERSION)

CONFIGURE_FILE(
  "${PROJECT_SOURCE_DIR}/src/ruff_config.h.in"
  "${PROJECT_SOURCE_DIR}/src/ruff_config.h"
)

INCLUDE(duktape)

IF("${CMAKE_SYSTEM_NAME}" MATCHES "Android")
    INCLUDE(uv-android)
ELSE()
    INCLUDE(uv-legacy)
ENDIF()

####################
#     INCLUDE
####################
ADD_CUSTOM_COMMAND(
    OUTPUT ruff_native.h
    COMMAND node ${PROJECT_SOURCE_DIR}/tools/build-embed-js.js ${PROJECT_SOURCE_DIR}/modules/ruff_modules buildin_js.bin
    COMMAND ${CMAKE_COMMAND} -E copy ${RUFF_JS_MODULES_PATH}/ruffjs/bootstrap.js bootstrap.js
    COMMAND node ${PROJECT_SOURCE_DIR}/tools/xxd.js  bootstrap.js bootstrap_js > ruff_native.h
    COMMAND node ${PROJECT_SOURCE_DIR}/tools/xxd.js  buildin_js.bin buildin_js > ruff_buildin_js.h
    DEPENDS ${RUFF_JS_MODULES_PATH}/ruffjs/bootstrap.js
)

INCLUDE_DIRECTORIES(${CMAKE_CURRENT_BINARY_DIR})

INCLUDE_DIRECTORIES(
        "${PROJECT_SOURCE_DIR}/${LIBRARY_INCLUDE_DIR}"
        "${PROJECT_SOURCE_DIR}/lib/duktape/src"
        "${PROJECT_SOURCE_DIR}/lib/duktape/examples/debug-trans-socket"
        "${PROJECT_SOURCE_DIR}/lib/uv/include"
        "${PROJECT_SOURCE_DIR}/lib/"
        "${PROJECT_SOURCE_DIR}/tools/compiler"
)

####################
#    LINT
####################

INCLUDE(Clint)
AUX_SOURCE_DIRECTORY("${PROJECT_SOURCE_DIR}/src" ALL_SOURCES)
ADD_STYLE_CHECK_TARGET(check "${ALL_SOURCES}")

###################
#    SUBDIR
###################

ADD_SUBDIRECTORY("${PROJECT_SOURCE_DIR}/src")

####################
#   LIBRARY
####################

ADD_LIBRARY(dschema
        src/schema.c
)

####################
#   COPY FILES
####################
#FOREACH(JSMODULE console util timers buffer path)
#    FILE(READ "${RUFF_JS_MODULES_PATH}/${JSMODULE}/src/index.js" contents)
#    FILE(WRITE "${CMAKE_BINARY_DIR}/buildin-js/${JSMODULE}.js" "${contents}")
#endforeach(JSMODULE)

####################
#   EXECUTABLE
####################
ADD_EXECUTABLE(${PROJECT_NAME} src/main.c src/ruff.c ruff_native.h tools/compiler/ruff_compiler.c)

IF("${CMAKE_SYSTEM_NAME}" MATCHES "Android")
    TARGET_LINK_LIBRARIES(${PROJECT_NAME} duv dschema duktape ${UV_LIB} ${SOCKLIB})
ELSE()
    TARGET_LINK_LIBRARIES(${PROJECT_NAME} duv dschema duktape uv ${SOCKLIB})
ENDIF()

#ADD_CUSTOM_COMMAND(
#    TARGET ruff
#    POST_BUILD
#    COMMAND node ${PROJECT_SOURCE_DIR}/tools/build-embed-js.js ${PROJECT_SOURCE_DIR}/modules/ruff_modules embed-js.bin
#    COMMAND node ${PROJECT_SOURCE_DIR}/tools/append.js ruff embed-js.bin
#

####################
#   INSTALL
####################
INSTALL(TARGETS ${PROJECT_NAME} RUNTIME DESTINATION ${PROJECT_BINARY_DIR}/bin)
#INSTALL(TARGETS ruff DESTINATION ${CMAKE_BINARY_DIR}/bin)
