dist: *.js package*.json
	npm run package

lint:
	npm run lint

update:
	npm update

dev-update:
	npm update --dev

.PHONY: dev-update dist lint update