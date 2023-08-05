# Monorepos with npm

See official [npm documentation](https://docs.npmjs.com/cli/v9/using-npm/workspaces) for more information.

## Basic Steps

1. In the root `package.json`, add a `workspaces` property with an array of globs that identify the local packages (see example below)
1. Each local package must have a name; I recommend using a scoped name with an npm organization you own (example `@zepln/foo`) or use a tilde or dash to attempt to distinguish from npm packages (`~foo` or `-foo`). You could even combine the approaches (`@zepln/~foo`)
1. Unlike pnpm, you do not need to reference workspace packages in `package.json` (I'm not even sure there's a way to do that); you just import them and they work thanks to the symlinking: `import { froo } from '~core'`, for example.

## The `workspaces` Property

Just list all of the workspaces (that have a `package.json` file) in the `workspaces` property of the root `package.json`:

```json
{
  "workspaces": [
    "core",
    "packages/*",
    "components/**",
    "!**/test/**"
  ]
}
```