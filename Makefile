.PHONY: audit build clean install reinstall lint test upgrade

.DEFAULT_GOAL := build

audit:
	@yarn npm audit --all

build:
	@yarn run build

clean:
	@rm -f yarn.lock
	@rm -rf node_modules

install:
	@yarn install

reinstall: clean install

lint:
	@yarn run lint

test:
	@yarn run test

upgrade:
	@pre-commit autoupdate
	@yarn upgrade-interactive
