import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const tests = [
  "effect/rules/no-manual-effect-error-tag.test.ts",
  "effect/rules/no-manual-tag-comparison.test.ts",
  "effect/rules/no-manual-tagged-construction.test.ts",
  "effect/rules/no-service-constructor-imports.test.ts",
  "effect/rules/prefer-effect-match.test.ts",
  "rules/no-array-filter-map.test.ts",
  "rules/no-chained-type-assertions.test.ts",
  "rules/no-conditional-empty-object-spread.test.ts",
  "rules/no-known-value-widening.test.ts",
  "rules/no-module-mocking.test.ts",
  "rules/no-object-parameters.test.ts",
  "rules/no-reduce-accumulator-copy.test.ts",
  "rules/no-reflect-apply.test.ts",
  "rules/no-reflect-get.test.ts",
  "rules/no-runtime-typeof.test.ts",
  "rules/no-shape-in-symbol-names.test.ts",
  "rules/no-unknown-parameters.test.ts",
  "rules/no-unknown-returns.test.ts",
  "rules/no-unknown-type-aliases.test.ts",
  "rules/no-unsafe-dictionary-type.test.ts",
  "rules/no-widen-then-assert.test.ts",
  "rules/require-readable-spacing-cli.test.ts",
  "rules/require-readable-spacing.test.ts",
  "rules/require-safety-comment-for-type-assertion.test.ts"
];

for (const test of tests) {
  const result = spawnSync(process.execPath, ["--experimental-strip-types", test], { cwd: root, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log(`Passed ${tests.length} anti-slop test files`);
