import test from "node:test";
import assert from "node:assert/strict";
import * as motionProfiles from "./motionProfiles.js";
import {
  LANDING_MEDIA,
  artifactDefinitions,
  getArtifactFlightItems,
  landingProfiles,
} from "./motionProfiles.js";

test("landing profiles define separate desktop and compact travel", () => {
  assert.equal(LANDING_MEDIA.desktop, "(min-width: 981px) and (prefers-reduced-motion: no-preference)");
  assert.equal(LANDING_MEDIA.compact, "(max-width: 980px) and (prefers-reduced-motion: no-preference)");
  assert.ok(landingProfiles.desktop.cranes.xPercent > landingProfiles.compact.cranes.xPercent);
  assert.ok(Math.abs(landingProfiles.desktop.cranes.yPercent) > Math.abs(landingProfiles.compact.cranes.yPercent));
});

test("each event route keeps exactly eight opening artifacts", () => {
  for (const id of ["lantern", "bubble-tea", "kimchi"]) {
    assert.equal(getArtifactFlightItems(id, false).length, 8);
    assert.equal(getArtifactFlightItems(id, true).length, 8);
  }
});

test("route artifacts use distinct motion personalities", () => {
  assert.equal(artifactDefinitions.lantern.ease, "sine.inOut");
  assert.equal(artifactDefinitions["bubble-tea"].ease, "back.out(1.25)");
  assert.equal(artifactDefinitions.kimchi.ease, "power2.out");
  assert.ok(artifactDefinitions.lantern.drift > artifactDefinitions.kimchi.drift);
  assert.ok(artifactDefinitions["bubble-tea"].rotation > artifactDefinitions.kimchi.rotation);
});

test("compact flights remain smaller than desktop flights", () => {
  const desktop = getArtifactFlightItems("lantern", false);
  const compact = getArtifactFlightItems("lantern", true);
  assert.ok(compact[0].size < desktop[0].size);
});

test("artifact travel clears the viewport plus its below-screen start and full height", () => {
  const viewportHeight = 900;
  const artifactHeight = 132;
  assert.equal(typeof motionProfiles.getArtifactTravelDistance, "function");

  for (const compact of [false, true]) {
    const belowViewport = viewportHeight * (compact ? 0.16 : 0.18);
    assert.ok(
      motionProfiles.getArtifactTravelDistance(viewportHeight, artifactHeight, compact)
        > viewportHeight + belowViewport + artifactHeight,
    );
  }

  assert.ok(
    motionProfiles.getArtifactTravelDistance(viewportHeight, artifactHeight, true)
      < motionProfiles.getArtifactTravelDistance(viewportHeight, artifactHeight, false),
  );
});

test("bubble tea and kimchi complete faster than lanterns", () => {
  const lanterns = getArtifactFlightItems("lantern", false);
  const bubbleTea = getArtifactFlightItems("bubble-tea", false);
  const kimchi = getArtifactFlightItems("kimchi", false);

  lanterns.forEach((lantern, index) => {
    assert.ok(bubbleTea[index].duration < lantern.duration);
    assert.ok(kimchi[index].duration < lantern.duration);
  });
});
