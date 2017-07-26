cmake_minimum_required (VERSION 2.8)

set (CMAKE_CXX_STANDARD 11)

find_package(PkgConfig)

# macos zeroc-ice cmake macros seems to be broken - fix paths accordingly
#find_package(Ice REQUIRED Ice)

set(ICE_INCLUDE_DIRS /opt/local/include)
set(ICE_LIBRARY_DIRS /opt/local/lib)
set(ICE_LIBS ZerocIce ZerocIceUtil)

add_custom_target(OUTPUT service_factory_server.cpp
  COMMAND slice2cpp service_factory.ice)

include_directories(${ICE_INCLUDE_DIRS})
link_directories(${ICE_LIBRARY_DIRS})
#include_directories(IceTestServer ${PROJECT_SOURCE_DIR}/ice ${PROJECT_SOURCE_DIR}/server ${Ice_INCLUDE_DIRS})
#add_executable(IceTestServer ${ice_HDR} ${ice_SRC} ${server_HDR} ${server_SRC})
#add_dependencies(IceTestServer IceGenerated)

add_executable(service_factory_server service_factory_server.cpp service_factory.cpp)
target_link_libraries(service_factory_server ${ICE_LIBS})
