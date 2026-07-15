import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const appSource = await readFile(new URL("../App.jsx", import.meta.url), "utf8");
const componentSource = await readFile(new URL("./OpeningArtifactFlight.jsx", import.meta.url), "utf8").catch(() => "");
const cssSource = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("App delegates opening flights to the scoped GSAP component", () => {
  assert.match(appSource, /OpeningArtifactFlight artifactId=\{openingArtifact\}/);
  assert.match(componentSource, /useGSAP/);
  assert.match(componentSource, /gsap\.matchMedia/);
});

test("obsolete CSS keyframes are removed and fallback artifacts stay hidden", () => {
  assert.doesNotMatch(cssSource, /@keyframes event-artifact-opening/);
  assert.match(cssSource, /\.event-floating-artifact[\s\S]*opacity:\s*0/);
});

test("GSAP uses viewport-relative pixel travel that clears each artifact", () => {
  assert.match(componentSource, /window\.innerHeight/);
  assert.match(componentSource, /node\.offsetHeight/);
  assert.match(componentSource, /y:\s*-getArtifactTravelDistance/);
  assert.doesNotMatch(componentSource, /yPercent:\s*-item\.travelY/);
});

test("route flights animate at every motion preference", () => {
  assert.doesNotMatch(componentSource, /prefers-reduced-motion/);
  assert.doesNotMatch(componentSource, /useReducedMotion/);
  assert.match(componentSource, /media\.add\("\(min-width: 981px\)"/);
  assert.match(componentSource, /media\.add\("\(max-width: 980px\)"/);
  assert.match(componentSource, /if \(!definition \|\| !visible\) return null/);
});

test("route flight waits for every artifact image to load and decode", () => {
  assert.match(componentSource, /const readyImagesRef = useRef\(new Set\(\)\)/);
  assert.match(componentSource, /await node\.decode\(\)/);
  assert.match(componentSource, /readyImagesRef\.current\.size === flightItems\.length/);
  assert.match(componentSource, /onLoad=\{\(event\) => markImageReady\(event, index\)\}/);
  assert.match(componentSource, /onError=\{\(\) => setVisible\(false\)\}/);
  assert.doesNotMatch(componentSource, /onLoad=\{index === 0/);
  assert.doesNotMatch(componentSource, /onError=\{index === 0/);
});
