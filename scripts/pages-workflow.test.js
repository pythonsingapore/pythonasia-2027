import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Pages workflow tests, builds, uploads, and deploys main", async () => {
  const workflow = await readFile(".github/workflows/deploy-pages.yml", "utf8");

  for (const required of [
    "branches: [\"main\"]",
    "workflow_dispatch:",
    "npm ci",
    "npm test",
    "npm run build:pages",
    "actions/configure-pages@v5",
    "actions/upload-pages-artifact@v4",
    "actions/deploy-pages@v4",
    "pages: read",
    "pages: write",
    "id-token: write",
  ]) {
    assert.match(
      workflow,
      new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
});
