.DEFAULT_GOAL := build

.PHONY: audit
audit:
	@pnpm audit

.PHONY: build
build:
	@pnpm run build

.PHONY: clean
clean:
	@pnpm run clean

.PHONY: install
install:
	@pnpm install

.PHONY: reinstall
reinstall:
	@make clean
	@pnpm run clean:unsafe
	@make install

.PHONY: lint
lint:
	@pnpm run lint

.PHONY: test
test:
	@pnpm run test

.PHONY: pnpm/update
pnpm/update:
	@pnpm update

.PHONY: pre-commit/update
pre-commit/update:
	@command -v prek >/dev/null 2>&1 && prek auto-update || pre-commit autoupdate

.PHONY: update
update: pnpm/update pre-commit/update

.PHONY: outdated
outdated:
	@pnpm outdated
