SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c  
.ONESHELL:
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.SECONDARY:

.PHONY: list
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null \
	  | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' \
	  | sort \
	  | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

.PHONY: clean
clean:
	rm -rf bin steps

bin:
	mkdir bin

steps:
	mkdir steps

steps/%.i: %.c steps
	gcc -E $< -o $@

steps/%.s: steps/%.i
	gcc -S $< -o $@

steps/%.o: steps/%.s
	as $< -o $@

ifeq ($(shell uname), Darwin)
bin/%: steps/%.o bin
	ld \
		-L /Library/Developer/CommandLineTools/SDKs/MacOSX12.1.sdk/usr/lib \
		-l System \
		-o $@ \
		$<
else
bin/%: steps/%.o bin
	ld -lc \
		-o $@ \
		--dynamic-linker /lib64/ld-linux-x86-64.so.2 \
		/usr/lib/x86_64-linux-gnu/crti.o \
		/usr/lib/x86_64-linux-gnu/crtn.o \
		/usr/lib/x86_64-linux-gnu/crt1.o \
		/usr/lib/x86_64-linux-gnu/libc_nonshared.a \
		$<
endif



