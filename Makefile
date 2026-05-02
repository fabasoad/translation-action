.DEFAULT_GOAL := build

.PHONY: audit
audit:
	@npm audit --audit-level moderate --package-lock-only --include dev

.PHONY: build
build:
	@npm run build

.PHONY: clean
clean:
	@npm run clean

.PHONY: install
install:
	@npm install

.PHONY: reinstall
reinstall:
	@make clean
	@npm run clean:unsafe
	@make install

.PHONY: lint
lint:
	@npm run lint

.PHONY: test
test:
	@npm run test

.PHONY: npm/update
npm/update:
	@npm update

.PHONY: pre-commit/update
pre-commit/update:
	@command -v prek >/dev/null 2>&1 && prek auto-update || pre-commit autoupdate

.PHONY: update
update: npm/update pre-commit/update

.PHONY: outdated
outdated:
	@npm outdated
