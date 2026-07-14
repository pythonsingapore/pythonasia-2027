import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  artifactDefinitions,
  getArtifactFlightItems,
  getArtifactTravelDistance,
} from "./motionProfiles.js";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => (
    typeof window !== "undefined"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(media.matches);
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  return reducedMotion;
}

export function OpeningArtifactFlight({ artifactId }) {
  const scopeRef = useRef(null);
  const readyImagesRef = useRef(new Set());
  const mountedRef = useRef(true);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const definition = artifactDefinitions[artifactId];
  const flightItems = definition ? getArtifactFlightItems(artifactId, false) : [];
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const markImageReady = async (event, index) => {
    const node = event.currentTarget;

    try {
      if (typeof node.decode === "function") await node.decode();
    } catch {
      // The load event still confirms a usable image when decode is unavailable or rejects.
    }

    if (!mountedRef.current) return;
    readyImagesRef.current.add(index);
    if (readyImagesRef.current.size === flightItems.length) setLoaded(true);
  };

  useGSAP(() => {
    if (!loaded || !visible || !scopeRef.current) return undefined;

    let active = true;
    const media = gsap.matchMedia();

    const animate = (compact) => {
      const nodes = gsap.utils.toArray(".event-floating-artifact", scopeRef.current);
      const items = getArtifactFlightItems(artifactId, compact);
      const timeline = gsap.timeline({
        onComplete: () => {
          if (active) setVisible(false);
        },
      });

      nodes.forEach((node, index) => {
        const item = items[index];
        gsap.set(node, {
          width: item.size,
          xPercent: -50,
          yPercent: 12,
          rotate: -item.rotation,
          scale: 0.78,
          autoAlpha: 0,
        });
        timeline.to(node, {
          y: -getArtifactTravelDistance(window.innerHeight, node.offsetHeight, compact),
          x: item.driftX,
          rotate: item.rotation,
          scale: 1.06,
          keyframes: [
            { autoAlpha: item.opacity, duration: item.duration * 0.12 },
            { autoAlpha: item.opacity, duration: item.duration * 0.66 },
            { autoAlpha: 0, duration: item.duration * 0.22 },
          ],
          duration: item.duration,
          delay: item.delay,
          ease: item.ease,
        }, 0);
      });
    };

    media.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => animate(false));
    media.add("(max-width: 980px) and (prefers-reduced-motion: no-preference)", () => animate(true));

    return () => {
      active = false;
      media.revert();
    };
  }, { scope: scopeRef, dependencies: [artifactId, loaded, visible] });

  if (!definition || !visible || reducedMotion) return null;

  return (
    <div ref={scopeRef} className="event-opening-flight" data-opening-artifact={artifactId} aria-hidden="true">
      {flightItems.map((item, index) => (
        <img
          className={`event-floating-artifact is-${artifactId}`}
          src={definition.src}
          alt=""
          decoding="async"
          fetchPriority="high"
          style={{ left: `${item.left}%`, width: `${item.size}px` }}
          onLoad={(event) => markImageReady(event, index)}
          onError={() => setVisible(false)}
          key={`${artifactId}-${item.left}`}
        />
      ))}
    </div>
  );
}
