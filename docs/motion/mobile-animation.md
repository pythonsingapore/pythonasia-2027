# Always-on mobile animation

## Goal

Make the existing Python Asia 2027 motion system run on mobile devices regardless of the operating system's reduced-motion preference. Preserve the current content, visual direction, assets, timing personalities, and responsive layout.

## Selected approach

Use the existing desktop and compact motion profiles, selected only by viewport width. Remove `prefers-reduced-motion` from the GSAP media queries and remove the CSS and React gates that suppress animation.

The red-dot orbit will move from a component-owned `requestAnimationFrame` loop to GSAP's shared ticker. Its drawing, orbit path, glow, and 5.8-second cycle remain unchanged; only the scheduling mechanism and reduced-motion branching change.

This was selected over two alternatives:

- Keeping the current system preference, which does not meet the requirement that mobile always animate.
- Adding a visible motion toggle, which would add interface content and controls outside the requested scope.

## Motion behavior

### Landing page

- Desktop viewports continue to use the desktop GSAP profile.
- Viewports at or below 980 pixels continue to use the compact GSAP profile.
- Cranes remain scroll-linked to the hero and follow their existing compact diagonal flight.
- Blossom, Merlion, community-map, statistic, section, and footer reveals keep their current triggers and timing.
- No landing animation is disabled by `prefers-reduced-motion`.

### Red-dot orbit

- The two existing canvases and drawing code remain intact.
- GSAP's ticker continuously advances the orbit on desktop and mobile.
- Resizing redraws at the current ticker time.
- The ticker is removed when the component unmounts.
- No reduced-motion branch freezes the dot.

### Route-opening artifacts

- Schedule lanterns, speaker bubble tea, and Code of Conduct kimchi always mount.
- Desktop and compact sizes remain separate.
- The GSAP media queries select only by viewport width.
- The current loading, decoding, cleanup, and completion behavior remains unchanged.

### CSS

- Remove the `prefers-reduced-motion: reduce` block that shortens animation and transition durations, resets decorative layers, and hides route-opening flights.
- Preserve every normal and responsive style outside that block.

## Accessibility trade-off

This implementation intentionally overrides the visitor's operating-system reduced-motion preference. Decorative animations remain non-interactive, hidden from assistive technology, clipped away from focus outlines, and unable to block navigation, but they will no longer pause for reduced-motion users.

## Testing

Automated contracts will verify:

- Desktop and compact GSAP media queries are width-only.
- No motion component or stylesheet contains a reduced-motion suppression gate.
- Route-opening artifacts mount without consulting a motion preference.
- The red-dot orbit uses `gsap.ticker` and cleans it up on unmount.
- Existing layout, artifact count, loading, motion-profile, path, and Pages deployment tests still pass.

Browser verification will use a 390-by-844 viewport and confirm:

- The red dot changes position over time.
- The cranes change transform and opacity while scrolling through the hero.
- Landing section reveals run while scrolling.
- Each event route renders and starts its compact opening-artifact flight.
- No new console errors appear.
