import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { preparePages } from "./prepare-pages.mjs";

test("creates direct route entries and a 404 fallback", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "pythonasia-pages-"));
  const distDir = join(root, "dist");
  await mkdir(distDir);
  await writeFile(join(distDir, "index.html"), "<html>launch</html>");
  t.after(() => rm(root, { recursive: true, force: true }));

  await preparePages(distDir);

  for (const file of [
    "schedule/index.html",
    "speakers/index.html",
    "coc/index.html",
    "404.html",
  ]) {
    assert.equal(await readFile(join(distDir, file), "utf8"), "<html>launch</html>");
  }
});
