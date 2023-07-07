rm -rf node_modules pnpm-lock.yaml core/node_modules cli/node_modules
pnpm i
node cli/test.mjs
