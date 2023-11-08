function(build_target TARGET_NAME)
  add_custom_target(${TARGET_NAME}
      WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
      make check
      make staging
      # ${COMMAND_MAKE} install
    )
endfunction()
