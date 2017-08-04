build: node_modules
	node metal.js

node_modules: package.json
	npm install

.PHONY: build