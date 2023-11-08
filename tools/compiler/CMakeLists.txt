CMAKE_MINIMUM_REQUIRED(VERSION 3.0)
PROJECT(ruff-compiler)
####################
#     CONFIG
####################

SET(RUFF_COMPILE_PROJECT YES)
SET(MAKE_COMMAND make)

SET(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/../../misc")
SET_PROPERTY(GLOBAL PROPERTY DUKTAPEDIR "${PROJECT_SOURCE_DIR}/../../lib/duktape/")

INCLUDE(duktape)

####################
#     INCLUDE
####################

INCLUDE_DIRECTORIES(
        "${PROJECT_SOURCE_DIR}/../../lib/duktape/src"
)

####################
#   COPY FILES
####################

####################
#   EXECUTABLE
####################
ADD_EXECUTABLE(ruff-compiler ruff_compiler.c)
TARGET_LINK_LIBRARIES(ruff-compiler duktape)

####################
#   INSTALL
####################
INSTALL(TARGETS ruff-compiler DESTINATION ${CMAKE_BINARY_DIR}/bin)
