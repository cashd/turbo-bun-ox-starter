import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Code } from "./code";

test("Code forwards the class name onto the code element", () => {
  const html = renderToStaticMarkup(<Code className="inline">bun test</Code>);

  expect(html).toBe('<code class="inline">bun test</code>');
});
