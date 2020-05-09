dist: *.js package*.json
	npm run package

update:
	npm update

dev-update:
	npm update --dev

.PHONY: dev-update dist update