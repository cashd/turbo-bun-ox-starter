# turbo-bun-ox-starter

A Turborepo starter on Bun workspaces, TypeScript 7, Next.js 16, and the
[oxc](https://oxc.rs) toolchain.

```sh
bun install
bun run dev
```

## What's inside

- `apps/web`, `apps/docs` — two Next.js apps
- `packages/ui` — React components shared by both
- `packages/typescript-config` — the shared `tsconfig.json` files
- `tools/oxlint/anti-slop` — a local oxlint plugin (see below)

## Choices worth knowing

**oxlint and oxfmt instead of ESLint and Prettier.** `.oxlintrc.json` at the root holds
the shared rules; each app extends it and adds the Next.js plugin. Lint runs with
`--type-aware`, so `oxlint-tsgolint` reads type information from the TypeScript 7
compiler.

**Anti-slop lint rules.** `tools/oxlint/anti-slop` adds ten rules that reject typing
patterns which pass the checker but defer the real contract — `unknown` parameters with
no parser, `typeof` narrowing that stands in for one, `x as unknown as T`, and similar.
They push parsing to the I/O boundary where the data comes from.

**Tests on `bun test`.** No separate runner to install or configure. Files named
`*.test.tsx` beside the source are picked up automatically; `packages/ui` has examples
that render components through `react-dom/server`, so there is no DOM emulator in the
tree either.

**One version per dependency.** Shared versions live in the `workspaces.catalog` block of
the root `package.json`. Packages reference them with `"catalog:"`.

**Hooks that run before you push.** `lefthook.yml` formats and lints staged files on
commit and type-checks on push. `bun install` installs the hooks.

**CI that only builds what changed.** `.github/workflows/ci.yml` runs format, then lint,
type-check, test, and build in one `turbo run` with
[`--affected`](https://turborepo.dev/docs/reference/run#--affected). Turborepo reads the
base ref out of the GitHub Actions environment on its own, so there is nothing to
configure — but it needs the history to compare against, which is why the checkout is
`fetch-depth: 0`. Set the `TURBO_TOKEN` secret and the `TURBO_TEAM` variable to turn on
[Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching).

**Agent skills.** `.claude/skills/vercel-react-best-practices` holds Vercel's React and
Next.js performance rules. Update it with `npx skills update`.

## Commands

| Command               | Does                        |
| --------------------- | --------------------------- |
| `bun run dev`         | Start every app             |
| `bun run build`       | Build every app and package |
| `bun run lint`        | Lint, type-aware            |
| `bun run test`        | Run every test              |
| `bun run check-types` | Type-check only             |
| `bun run format`      | Format with oxfmt           |

Add `--filter=web` to scope a turbo task to one package:

```sh
bunx turbo dev --filter=web
```

## Vendored lint rules

Use Node.js 24 or newer alongside Bun to run the anti-slop RuleTester tests.
`bun run test` includes them, and `bun run check-types` checks the vendored source.
The source revision and retained local changes are recorded in
[`tools/oxlint/anti-slop/UPSTREAM.md`](tools/oxlint/anti-slop/UPSTREAM.md).
All 18 generic rules are enabled; the separate Effect rules remain opt-in.
