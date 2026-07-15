import test from "node:test";
import assert from "node:assert/strict";

import { createSitePaths } from "./sitePaths.js";

test("creates local URLs from the root base", () => {
  const paths = createSitePaths("/");

  assert.equal(paths.href("/schedule"), "/schedule");
  assert.equal(paths.href("/#updates"), "/#updates");
  assert.equal(
    paths.asset("schedule-python-culture-01.webp"),
    "/assets/schedule-python-culture-01.webp",
  );
  assert.equal(paths.route("/schedule/"), "/schedule");
});

test("creates project-site URLs from the GitHub Pages base", () => {
  const paths = createSitePaths("/pythonasia-2027/");

  assert.equal(paths.href("/"), "/pythonasia-2027/");
  assert.equal(paths.href("/speakers"), "/pythonasia-2027/speakers");
  assert.equal(paths.href("/#updates"), "/pythonasia-2027/#updates");
  assert.equal(
    paths.asset("pycon-asia-mark.webp"),
    "/pythonasia-2027/assets/pycon-asia-mark.webp",
  );
  assert.equal(paths.route("/pythonasia-2027/coc/"), "/coc");
});

test("preserves non-site URLs", () => {
  const paths = createSitePaths("/pythonasia-2027/");

  assert.equal(paths.href("https://python.org"), "https://python.org");
  assert.equal(paths.href("mailto:hello@example.com"), "mailto:hello@example.com");
  assert.equal(paths.href("#updates"), "#updates");
});
