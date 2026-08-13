import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Card } from "./card";

describe("Card", () => {
  test("renders the title and children", () => {
    const html = renderToStaticMarkup(
      <Card href="https://turborepo.dev" title="Docs">
        Find in-depth information
      </Card>,
    );

    expect(html).toContain("Docs");
    expect(html).toContain("Find in-depth information");
  });

  test("opens in a new tab without leaking the opener", () => {
    const html = renderToStaticMarkup(
      <Card href="https://turborepo.dev" title="Docs">
        Body
      </Card>,
    );

    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
