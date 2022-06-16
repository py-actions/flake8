dist: src/*.js package*.json
	npm run package

lint:
	npm run lint

update:
	npm update --legacy-peer-deps

dev-update:
	npm update --include=dev --legacy-peer-deps

.PHONY: dev-update dist lint update