# Monorepos with pnpm

## Basic Steps

Here are the steps to create a monorepo with pnpm:

1. In the root, create a `pnpm-workspace.yaml` file (see example below)
1. Each local package must have a name; I recommend using a scoped name with an npm organization you own (example `@zepln/foo`) or use a tilde or dash to attempt to distinguish from npm packages (`~foo` or `-foo`). You could even combine the approaches (`@zepln/~foo`)
1. To use a local package (`~core`, for example) from another package (`~cli`, for example), in the `package.json` for `~cli`, reference `~core` like this: `"~core": "workspace:*"`. The `workspace:` prefix is optional, but it will prevent accidental attempts to fetch npm packages. You can also specifiy versions, but it's usually not desired in a monorepo. In source code, simply import with the package name (for example, `import { foo } from '~core'`).

## The `pnpm-workspace.yaml` File

Note: `pnpm-workspace.yaml` must be named exactly; it won't work if it's plural, or has an extension of `.yml`.

Note: the names of the folders the local packages are in are only important to `pnpm-workspace.yaml`; when the package is referenced from a source import or a `package.json`, what's important is the `name` proeprty in the package's `package.json` file. That said, you should use folder names that are at least similar to the package name. For example, the `~core` package should go in `core` or `pakcages/core` or whatever.

```yaml
packages:
  # identifies a package right off the root; core/package.json should exist
  - 'core'
  # identifies packages that are in a subdirectory; note that this does NOT
  # work if packages itself is a package!  that is, packages/package.json
  # will not be treated as a package, but packages/foo/package.json will.
  - 'packages/*'
  # can also pick up sub-sub packages
  - 'components/**'
  # exclude packages that are inside test directories (example from pnpm docs)
  - '!**/test/**'
```

## Valid Package Names

I discovered experimentally there's a lot more flexibility than waht's actually allowed in the various specs. See the [npm documentation on the `name` property`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name).

The only prefix characters that appear to be valid, at least according to VSCode's regex, are `~` and `-`, so I recommend sticking with those. However, I found experimentally that all of the following work:

- `~`, `!`, `$`, `^`, `&`, `*`, `-`, `+`, `_`, `=`, `[` (so `[foo]` works!), `(` (and `(foo)`), `|`, `<` (and `<foo>`), `:`, `;`, `,`

Characters that break pnpm:

- `#`, `@`, `%`, `/`, `\` (`\\`), `{`, `.`, `?`

# Miscellaneous Notes

- `private` does _not_ have to be true in `package.json` (any of them)
- `workspaces` does _not_ have to be set in root `package.json` (though probably a good idea?) not sure....
- monorepo package _can_ have same name as npm package; it will override npm package even without the `workspace:` prefix in `package.json` deps. `workspace:` prefix is _highly_ recommended, though...prevents accidental use of npm packages.
