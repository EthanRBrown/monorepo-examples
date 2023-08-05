rm -rf package-lock.json node_modules core/node_modules cli/node_modules
npm i
node cli/test.mjs
