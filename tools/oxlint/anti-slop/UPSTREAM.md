# Anti-slop upstream

Source: https://github.com/dmmulroy/anti-slop

Revision: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b`. All generic and Effect implementations and tests are vendored.
The generic rules are enabled in the root Oxlint config. Effect rules remain opt-in.

The prior implementation matches `c76ee37` after formatting and two local lint
cleanups: `member.optional === true` becomes `member.optional`, and `arguments_`
becomes `typeArguments` in `shared/dictionary-types.ts`. Both cleanups are retained.
Upstream includes the existing recursion guard.

Local integration adds package metadata, a typecheck config and a standalone test
runner. The CLI regression test invokes `oxlint` from PATH instead of `pnpm exec`.
Vendored source is excluded from application lint and formatting and tested directly.
The nested Stylistic license and provenance are preserved.
