import { sitePaths } from "../sitePaths.js";

export const LANDING_MEDIA = {
  desktop: "(min-width: 981px)",
  compact: "(max-width: 980px)",
};

export const landingProfiles = {
  desktop: {
    cranes: { xPercent: 136, yPercent: -134, scale: 0.72, rotate: -5 },
    bloom: { yPercent: -14, scale: 1.04, peakOpacity: 0.42, blur: 1.2 },
    merlion: { yPercent: -10, scale: 1, peakOpacity: 0.5, blur: 0 },
    map: { fromScale: 0.965, y: 22 },
  },
  compact: {
    cranes: { xPercent: 72, yPercent: -92, scale: 0.78, rotate: -3 },
    bloom: { yPercent: -8, scale: 1.02, peakOpacity: 0.36, blur: 0.8 },
    merlion: { yPercent: -6, scale: 1, peakOpacity: 0.42, blur: 0 },
    map: { fromScale: 0.98, y: 14 },
  },
};

export const artifactDefinitions = {
  lantern: {
    src: sitePaths.asset("floating-lantern-optimized.png"),
    ease: "sine.inOut",
    drift: 28,
    rotation: 6,
    opacity: 0.4,
    durationMultiplier: 1,
  },
  "bubble-tea": {
    src: sitePaths.asset("floating-bubble-tea.webp"),
    ease: "back.out(1.25)",
    drift: 20,
    rotation: 10,
    opacity: 0.36,
    durationMultiplier: 0.86,
  },
  kimchi: {
    src: sitePaths.asset("floating-kimchi.webp"),
    ease: "power2.out",
    drift: 10,
    rotation: 3,
    opacity: 0.32,
    durationMultiplier: 0.78,
  },
};

export const artifactSeeds = [
  { left: 0, size: 112, compactSize: 68, delay: 0, duration: 1.55, direction: 1 },
  { left: 12, size: 78, compactSize: 48, delay: 0.12, duration: 1.5, direction: -1 },
  { left: 25, size: 128, compactSize: 76, delay: 0.04, duration: 1.75, direction: 1 },
  { left: 38, size: 92, compactSize: 56, delay: 0.2, duration: 1.6, direction: -1 },
  { left: 51, size: 116, compactSize: 70, delay: 0.08, duration: 1.65, direction: 1 },
  { left: 64, size: 74, compactSize: 46, delay: 0.26, duration: 1.65, direction: -1 },
  { left: 77, size: 132, compactSize: 80, delay: 0.14, duration: 1.75, direction: 1 },
  { left: 90, size: 96, compactSize: 58, delay: 0.02, duration: 1.55, direction: -1 },
];

export function getArtifactFlightItems(artifactId, compact) {
  const personality = artifactDefinitions[artifactId];
  if (!personality) throw new Error(`Unknown artifact: ${artifactId}`);

  return artifactSeeds.map((seed) => ({
    ...seed,
    size: compact ? seed.compactSize : seed.size,
    duration: seed.duration * personality.durationMultiplier,
    driftX: personality.drift * seed.direction,
    rotation: personality.rotation * seed.direction,
    opacity: personality.opacity,
    ease: personality.ease,
  }));
}

export function getArtifactTravelDistance(viewportHeight, artifactHeight, compact) {
  const belowViewport = viewportHeight * (compact ? 0.16 : 0.18);
  return viewportHeight + belowViewport + artifactHeight + 8;
}
