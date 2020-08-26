install:
	make install-deps
install-deps:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
