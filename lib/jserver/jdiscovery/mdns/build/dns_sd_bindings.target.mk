# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := dns_sd_bindings
DEFS_Coverage := \
	'-DNODE_GYP_MODULE_NAME=dns_sd_bindings' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DHAVE_DNSSERVICEGETADDRINFO' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Coverage := \
	-O0 \
	-gdwarf-2 \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Coverage := \
	-fno-strict-aliasing \
	--coverage

# Flags passed to only C++ files.
CFLAGS_CC_Coverage := \
	-std=gnu++0x \
	-fno-rtti \
	-fno-exceptions \
	-fno-threadsafe-statics \
	-fno-strict-aliasing \
	--coverage

# Flags passed to only ObjC files.
CFLAGS_OBJC_Coverage :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Coverage :=

INCS_Coverage := \
	-I/Users/kstricks/.node-gyp/6.9.5/include/node \
	-I/Users/kstricks/.node-gyp/6.9.5/src \
	-I/Users/kstricks/.node-gyp/6.9.5/deps/uv/include \
	-I/Users/kstricks/.node-gyp/6.9.5/deps/v8/include \
	-I$(srcdir)/node_modules/nan

DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=dns_sd_bindings' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DHAVE_DNSSERVICEGETADDRINFO' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-O0 \
	-gdwarf-2 \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Debug := \
	-fno-strict-aliasing

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-std=gnu++0x \
	-fno-rtti \
	-fno-exceptions \
	-fno-threadsafe-statics \
	-fno-strict-aliasing

# Flags passed to only ObjC files.
CFLAGS_OBJC_Debug :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Debug :=

INCS_Debug := \
	-I/Users/kstricks/.node-gyp/6.9.5/include/node \
	-I/Users/kstricks/.node-gyp/6.9.5/src \
	-I/Users/kstricks/.node-gyp/6.9.5/deps/uv/include \
	-I/Users/kstricks/.node-gyp/6.9.5/deps/v8/include \
	-I$(srcdir)/node_modules/nan

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=dns_sd_bindings' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DHAVE_DNSSERVICEGETADDRINFO' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-O3 \
	-gdwarf-2 \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Release := \
	-fno-strict-aliasing

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-std=gnu++0x \
	-fno-rtti \
	-fno-exceptions \
	-fno-threadsafe-statics \
	-fno-strict-aliasing

# Flags passed to only ObjC files.
CFLAGS_OBJC_Release :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Release :=

INCS_Release := \
	-I/Users/kstricks/.node-gyp/6.9.5/include/node \
	-I/Users/kstricks/.node-gyp/6.9.5/src \
	-I/Users/kstricks/.node-gyp/6.9.5/deps/uv/include \
	-I/Users/kstricks/.node-gyp/6.9.5/deps/v8/include \
	-I$(srcdir)/node_modules/nan

OBJS := \
	$(obj).target/$(TARGET)/src/dns_sd.o \
	$(obj).target/$(TARGET)/src/dns_service_browse.o \
	$(obj).target/$(TARGET)/src/dns_service_enumerate_domains.o \
	$(obj).target/$(TARGET)/src/dns_service_get_addr_info.o \
	$(obj).target/$(TARGET)/src/dns_service_process_result.o \
	$(obj).target/$(TARGET)/src/dns_service_ref.o \
	$(obj).target/$(TARGET)/src/dns_service_ref_deallocate.o \
	$(obj).target/$(TARGET)/src/dns_service_ref_sock_fd.o \
	$(obj).target/$(TARGET)/src/dns_service_register.o \
	$(obj).target/$(TARGET)/src/dns_service_resolve.o \
	$(obj).target/$(TARGET)/src/dns_service_update_record.o \
	$(obj).target/$(TARGET)/src/mdns_utils.o \
	$(obj).target/$(TARGET)/src/network_interface.o \
	$(obj).target/$(TARGET)/src/socket_watcher.o \
	$(obj).target/$(TARGET)/src/txt_record_ref.o \
	$(obj).target/$(TARGET)/src/txt_record_create.o \
	$(obj).target/$(TARGET)/src/txt_record_deallocate.o \
	$(obj).target/$(TARGET)/src/txt_record_set_value.o \
	$(obj).target/$(TARGET)/src/txt_record_get_length.o \
	$(obj).target/$(TARGET)/src/txt_record_buffer_to_object.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))
$(OBJS): GYP_OBJCFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE)) $(CFLAGS_OBJC_$(BUILDTYPE))
$(OBJS): GYP_OBJCXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE)) $(CFLAGS_OBJCC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Coverage := \
	-undefined dynamic_lookup \
	-Wl,-no_pie \
	-Wl,-search_paths_first \
	--coverage \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-L$(builddir)

LIBTOOLFLAGS_Coverage := \
	-undefined dynamic_lookup \
	-Wl,-no_pie \
	-Wl,-search_paths_first \
	--coverage

LDFLAGS_Debug := \
	-undefined dynamic_lookup \
	-Wl,-no_pie \
	-Wl,-search_paths_first \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-L$(builddir)

LIBTOOLFLAGS_Debug := \
	-undefined dynamic_lookup \
	-Wl,-no_pie \
	-Wl,-search_paths_first

LDFLAGS_Release := \
	-undefined dynamic_lookup \
	-Wl,-no_pie \
	-Wl,-search_paths_first \
	-mmacosx-version-min=10.7 \
	-arch x86_64 \
	-L$(builddir)

LIBTOOLFLAGS_Release := \
	-undefined dynamic_lookup \
	-Wl,-no_pie \
	-Wl,-search_paths_first

LIBS :=

$(builddir)/dns_sd_bindings.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(builddir)/dns_sd_bindings.node: LIBS := $(LIBS)
$(builddir)/dns_sd_bindings.node: GYP_LIBTOOLFLAGS := $(LIBTOOLFLAGS_$(BUILDTYPE))
$(builddir)/dns_sd_bindings.node: TOOLSET := $(TOOLSET)
$(builddir)/dns_sd_bindings.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(builddir)/dns_sd_bindings.node
# Add target alias
.PHONY: dns_sd_bindings
dns_sd_bindings: $(builddir)/dns_sd_bindings.node

# Short alias for building this executable.
.PHONY: dns_sd_bindings.node
dns_sd_bindings.node: $(builddir)/dns_sd_bindings.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/dns_sd_bindings.node
