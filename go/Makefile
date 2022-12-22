SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c  
.ONESHELL:
.DELETE_ON_ERROR: clean
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.SECONDARY:

.PHONY: list
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

.PHONY: clean
clean:
	@rm -rf bin

bin:
	@mkdir -p bin

bin/%: cmd/%/main.go bin $(wildcard internal/**/*.go) go.*
    # Use CGO_ENABLED=0 to build a static binary.
	CGO_ENABLED=0 go build -o $@ github.com/wesleyklop/icpt/go/v2/$(dir $<)
