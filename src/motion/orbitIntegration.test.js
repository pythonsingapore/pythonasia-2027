import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const appSource = await readFile(new URL("../App.jsx", import.meta.url), "utf8");

test("red-dot orbit always runs on the shared GSAP ticker", () => {
  assert.match(appSource, /import gsap from "gsap"/);
  assert.match(appSource, /gsap\.ticker\.add\(renderOrbit\)/);
  assert.match(appSource, /gsap\.ticker\.remove\(renderOrbit\)/);
  assert.doesNotMatch(appSource, /requestAnimationFrame\(renderOrbit\)/);
  assert.doesNotMatch(appSource, /prefers-reduced-motion/);
});
