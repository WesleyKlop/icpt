SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c  
.ONESHELL:
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

bin:
	mkdir bin

bin/%: %.c bin
	gcc $< -o $@
