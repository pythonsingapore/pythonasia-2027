import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LANDING_MEDIA, landingProfiles } from "./motionProfiles.js";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const select = (scope, marker) => scope.querySelector(`[data-motion="${marker}"]`);

function addSectionReveal(trigger, targets) {
  if (!trigger || !targets.length) return;
  gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.48,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: { trigger, start: "top 84%", once: true },
    },
  );
}

function buildLandingScene(scope, profile) {
  const hero = select(scope, "hero");
  const orbit = select(scope, "orbit");
  const cranes = select(scope, "cranes");
  const bloom = select(scope, "bloom");
  const merlion = select(scope, "merlion");
  const process = select(scope, "process");
  const sponsorship = select(scope, "sponsorship");
  const community = select(scope, "community");
  const map = select(scope, "map");
  const stats = select(scope, "stats");
  const footer = select(scope, "footer");

  if (orbit) {
    gsap.fromTo(
      orbit,
      { autoAlpha: 0, scale: 0.94 },
      { autoAlpha: 1, scale: 1, duration: 0.55, delay: 0.32, ease: "power2.out" },
    );
  }

  if (hero && cranes) {
    gsap
      .timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 } })
      .to(cranes, {
        xPercent: profile.cranes.xPercent,
        yPercent: profile.cranes.yPercent,
        scale: profile.cranes.scale,
        rotate: profile.cranes.rotate,
        autoAlpha: 0,
        ease: "none",
      });
  }

  if (process && bloom) {
    gsap
      .timeline({ scrollTrigger: { trigger: process, start: "top 92%", end: "bottom 25%", scrub: 0.7 } })
      .fromTo(
        bloom,
        { autoAlpha: 0, yPercent: 10, scale: 1.08, "--bloom-blur": "6px" },
        {
          autoAlpha: profile.bloom.peakOpacity,
          yPercent: 0,
          scale: 1,
          "--bloom-blur": `${profile.bloom.blur}px`,
          ease: "none",
        },
      )
      .to(bloom, {
        autoAlpha: 0,
        yPercent: profile.bloom.yPercent,
        scale: profile.bloom.scale,
        "--bloom-blur": "5px",
        ease: "none",
      });
  }

  if (sponsorship && merlion) {
    gsap
      .timeline({ scrollTrigger: { trigger: sponsorship, start: "top 88%", end: "bottom 22%", scrub: 0.8 } })
      .fromTo(
        merlion,
        { autoAlpha: 0, yPercent: 8, scale: 1.03, "--merlion-blur": "3.6px" },
        {
          autoAlpha: profile.merlion.peakOpacity,
          yPercent: 0,
          scale: profile.merlion.scale,
          "--merlion-blur": `${profile.merlion.blur}px`,
          ease: "none",
        },
      )
      .to(merlion, { autoAlpha: 0.08, yPercent: profile.merlion.yPercent, ease: "none" });
  }

  if (community && map) {
    gsap.fromTo(
      map,
      { autoAlpha: 0.6, scale: profile.map.fromScale, y: profile.map.y },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: community, start: "top 74%", once: true },
      },
    );
  }

  addSectionReveal(community, stats ? Array.from(stats.children) : []);

  if (footer) {
    gsap.fromTo(
      footer,
      { "--footer-art-y": "36px", "--footer-art-opacity": 0.08 },
      {
        "--footer-art-y": "0px",
        "--footer-art-opacity": 0.22,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: footer, start: "top 90%", once: true },
      },
    );
  }

  for (const marker of ["process", "sponsorship", "tracks", "updates"]) {
    const section = select(scope, marker);
    addSectionReveal(section, section ? Array.from(section.children).slice(0, 8) : []);
  }
}

export function useLandingMotion(scopeRef) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return undefined;

      const media = gsap.matchMedia();
      media.add(LANDING_MEDIA.desktop, () => buildLandingScene(scope, landingProfiles.desktop));
      media.add(LANDING_MEDIA.compact, () => buildLandingScene(scope, landingProfiles.compact));
      media.add(LANDING_MEDIA.reduced, () => {
        gsap.set(scope.querySelectorAll("[data-motion]"), { clearProps: "all" });
      });

      const refresh = () => ScrollTrigger.refresh();
      const map = select(scope, "map");

      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });

      if (map) {
        map.addEventListener("load", refresh, { once: true });
        map.addEventListener("error", refresh, { once: true });
        if (map.complete) refresh();
      }

      return () => {
        window.removeEventListener("load", refresh);
        if (map) {
          map.removeEventListener("load", refresh);
          map.removeEventListener("error", refresh);
        }
        media.revert();
      };
    },
    { scope: scopeRef },
  );
}
