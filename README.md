# Turborepo starter

Bun workspaces, Turborepo, Next.js, and TypeScript 7.

```sh
bun install
bun run dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) 7.

### Linting and formatting

[oxlint](https://oxc.rs/docs/guide/usage/linter.html) and
[oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) replace ESLint and Prettier.
`.oxlintrc.json` at the root holds the shared rules; each app extends it and adds the
Next.js plugin. Lint runs with `--type-aware`, which uses `oxlint-tsgolint` to read type
information from the TypeScript 7 compiler.

### Tests

Tests run on [`bun test`](https://bun.sh/docs/cli/test) — no separate test runner to
install or configure. Files named `*.test.tsx` next to the source are picked up
automatically. `@repo/ui` has examples that render components with
`react-dom/server`. Run them all with `bun run test`.

### Dependency versions

Shared dependency versions live in the `workspaces.catalog` block of the root
`package.json`. Packages reference them with `"catalog:"`, so a version is written once
and every workspace follows it.

### Git hooks

`lefthook.yml` formats and lints staged files before each commit and type-checks before
each push. `bun install` installs the hooks through the `prepare` script.

### CI

`.github/workflows/ci.yml` runs format, lint, type-check, test, and build in one
`turbo run` with
[`--affected`](https://turborepo.dev/docs/reference/run#--affected), so only the packages
touched since the base do work. Turborepo reads the base ref out of the GitHub Actions
environment on its own, so there is nothing to configure — but the checkout must have the
history, hence `fetch-depth: 0`. Set the `TURBO_TOKEN` secret and the
`TURBO_TEAM` variable to enable
[Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching).

### Agent skills

`.claude/skills/vercel-react-best-practices` holds Vercel's React and Next.js
performance rules. Update it with `npx skills update`.

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for code linting
- [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
bunx turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
bunx turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
bunx turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
bunx turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
bunx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
bunx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
