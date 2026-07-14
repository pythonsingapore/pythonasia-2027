import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const appSource = await readFile(new URL("../App.jsx", import.meta.url), "utf8");
const motionSource = await readFile(new URL("./useLandingMotion.js", import.meta.url), "utf8");
const stylesSource = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("landing page uses a scoped GSAP motion hook", () => {
  assert.match(appSource, /useLandingMotion\(motionScopeRef\)/);
  assert.match(appSource, /shellRef=\{motionScopeRef\}/);
  assert.doesNotMatch(appSource, /createTimeline|from "animejs"|document\.querySelector/);
});

test("landing landmarks expose stable motion markers", () => {
  for (const marker of ["hero", "orbit", "process", "sponsorship", "tracks", "community", "map", "stats", "updates", "footer"]) {
    assert.match(appSource, new RegExp(`data-motion=["']${marker}["']`));
  }
});

test("landing artifact blur tweens preserve the CSS filter chains", () => {
  assert.doesNotMatch(motionSource, /\bfilter\s*:/);
  assert.match(motionSource, /"--bloom-blur"/);
  assert.match(motionSource, /"--merlion-blur"/);
});

test("footer motion properties are consumed by its pseudo-element", () => {
  assert.match(
    stylesSource,
    /\.site-footer::before\s*\{[^}]*opacity:\s*var\(--footer-art-opacity,\s*1\)[^}]*transform:\s*translate3d\(0,\s*var\(--footer-art-y,\s*0px\),\s*0\)/s,
  );
});

test("community map refreshes scoped scroll geometry after settling", () => {
  assert.match(motionSource, /const map = select\(scope, "map"\)/);
  assert.match(motionSource, /map\.addEventListener\("load",\s*refresh/);
  assert.match(motionSource, /map\.addEventListener\("error",\s*refresh/);
  assert.match(motionSource, /if \(map\.complete\)\s*refresh\(\)/);
  assert.match(motionSource, /map\.removeEventListener\("load",\s*refresh\)/);
  assert.match(motionSource, /map\.removeEventListener\("error",\s*refresh\)/);
  assert.match(motionSource, /document\.readyState === "complete"/);
});

test("community map reserves its intrinsic geometry", () => {
  assert.match(
    appSource,
    /className="asia-map"[^>]*width="1100"[^>]*height="825"/,
  );
  assert.match(stylesSource, /\.asia-map\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*3/s);
});
