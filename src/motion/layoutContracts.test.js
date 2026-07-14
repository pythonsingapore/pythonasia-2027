import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const app = await readFile(new URL("../App.jsx", import.meta.url), "utf8");

function blockFor(source, header, fromIndex = 0) {
  const headerIndex = source.indexOf(header, fromIndex);
  assert.notEqual(headerIndex, -1, `Missing block: ${header}`);

  const openIndex = header.endsWith("{")
    ? headerIndex + header.length - 1
    : source.indexOf("{", headerIndex + header.length);
  assert.notEqual(openIndex, -1, `Missing opening brace: ${header}`);

  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }

  assert.fail(`Missing closing brace: ${header}`);
}

function declaration(block, property) {
  const match = block.match(new RegExp(`(?:^|\\n)\\s*${property}:\\s*([^;]+);`));
  assert.ok(match, `Missing declaration: ${property}`);
  return match[1].trim();
}

function ruleFor(source, selector, property) {
  const header = `${selector} {`;
  let fromIndex = 0;

  while (fromIndex < source.length) {
    const headerIndex = source.indexOf(header, fromIndex);
    assert.notEqual(headerIndex, -1, `Missing ${selector} rule with ${property}`);
    const block = blockFor(source, header, headerIndex);
    if (new RegExp(`(?:^|\\n)\\s*${property}:`).test(block)) return block;
    fromIndex = headerIndex + header.length;
  }

  assert.fail(`Missing ${selector} rule with ${property}`);
}

function transitionDuration(block, property) {
  const transition = declaration(block, "transition");
  const match = transition.match(new RegExp(`${property}\\s+(\\d+)ms`));
  assert.ok(match, `Missing ${property} transition`);
  return Number(match[1]);
}

function assertTransitionRange(block) {
  const transition = declaration(block, "transition");
  const durations = [...transition.matchAll(/\b(\d+)ms\b/g)].map((match) => Number(match[1]));
  assert.ok(durations.length > 0, "Missing transition durations");
  durations.forEach((duration) => {
    assert.ok(duration >= 180 && duration <= 250, `transition is ${duration}ms`);
  });
}

test("decorative layers are clipped without hiding focus outlines", () => {
  assert.equal(declaration(ruleFor(css, ".page-shell", "overflow-x"), "overflow-x"), "clip");
  assert.equal(declaration(ruleFor(css, ".motion-artifact-clip", "overflow"), "overflow"), "clip");
});

test("map and section bands cannot widen compact layouts", () => {
  const compact = blockFor(css, "@media (max-width: 980px)");
  assert.equal(declaration(ruleFor(compact, ".asia-map", "max-width"), "max-width"), "100%");
  assert.equal(
    declaration(ruleFor(compact, ".section-band", "max-width"), "max-width"),
    "calc(100vw - 40px)",
  );
});

test("reduced motion restores complete static compositions", () => {
  const reduced = blockFor(css, "@media (prefers-reduced-motion: reduce)");
  const motionRule = ruleFor(reduced, "[data-motion]", "opacity");
  assert.equal(declaration(motionRule, "opacity"), "1 !important");
  assert.doesNotMatch(motionRule, /(?:^|\n)\s*transform:/);
  assert.equal(
    declaration(ruleFor(reduced, ".cherry-bloom-layer,\n  .merlion-side-layer", "transform"), "transform"),
    "translateX(-50%) !important",
  );
  assert.equal(declaration(ruleFor(reduced, ".event-opening-flight", "display"), "display"), "none");
});

test("no-JS landing artwork has visible base states", () => {
  assert.equal(declaration(ruleFor(css, ".floating-cranes", "opacity"), "opacity"), "0.9");
  assert.equal(declaration(ruleFor(css, ".cherry-bloom-layer", "opacity"), "opacity"), "0.2");
  assert.equal(declaration(ruleFor(css, ".merlion-side-layer", "opacity"), "opacity"), "0.2");
});

test("artifact wrapper contains only three hidden decorative images", () => {
  const match = app.match(
    /<div className="motion-artifact-clip" aria-hidden="true">([\s\S]*?)<\/div>/,
  );
  assert.ok(match, "Missing decorative artifact wrapper");

  const contents = match[1];
  const images = contents.match(/<img\b[^>]*\/>/g) ?? [];
  assert.equal(images.length, 3);
  assert.deepEqual(
    images.map((image) => image.match(/data-motion="([^"]+)"/)?.[1]),
    ["bloom", "merlion", "cranes"],
  );
  images.forEach((image) => assert.match(image, /aria-hidden="true"/));
  assert.doesNotMatch(contents, /<(?:a|button|input|select|textarea)\b|tabIndex=/);
});

test("connect card artwork responds within 250ms", () => {
  const pseudoElements = blockFor(css, ".connect-card::before,\n.connect-card::after");
  const duration = transitionDuration(pseudoElements, "transform");
  assert.ok(duration >= 180 && duration <= 250, `transform transition is ${duration}ms`);
  assertTransitionRange(pseudoElements);
});

test("schedule artwork responds within 250ms", () => {
  const pseudoElements = blockFor(
    css,
    ".ledger-session::before,\n.mobile-slot button::before",
  );
  const duration = transitionDuration(pseudoElements, "transform");
  assert.ok(duration >= 180 && duration <= 250, `transform transition is ${duration}ms`);
  assertTransitionRange(pseudoElements);
});
