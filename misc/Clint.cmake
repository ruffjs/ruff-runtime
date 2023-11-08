# CMake cpplint
# Copyright 2015 Qi Chen

# Licensed under the "THE BEER-WARE LICENSE" (Revision 42):
# John Doe wrote this file. As long as you retain this notice you
# can do whatever you want with this stuff. If we meet some day, and you think
# this stuff is worth it, you can buy me a beer or coffee in return


FIND_PACKAGE(PythonInterp)
# Add a target that runs cpplint.py
#
# Parameters:
# - TARGET_NAME the name of the target to add
# - SOURCES_LIST a complete list of source and include files to check
function(add_style_check_target TARGET_NAME SOURCES)

  if(NOT PYTHONINTERP_FOUND)
    return()
  endif()

  list(REMOVE_DUPLICATES SOURCES)
  list(SORT SOURCES)

  add_custom_target(${TARGET_NAME}
    COMMAND "${CMAKE_COMMAND}" -E chdir
            "${CMAKE_CURRENT_SOURCE_DIR}"
            "${PYTHON_EXECUTABLE}"
            "${CMAKE_SOURCE_DIR}/misc/clint.py"
            # "--filter=${STYLE_FILTER}"
            ${SOURCES}
    DEPENDS ${SOURCES}
    COMMENT "Linting ${TARGET_NAME}"
    VERBATIM)

endfunction()
