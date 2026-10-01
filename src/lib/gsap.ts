import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ ease: "power3.out", duration: 1 });

/** Shared easing curves so motion feels consistent across the site. */
export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power4.inOut",
} as const;

/** Media queries used with gsap.matchMedia() to scale animation per device. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduced).matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.finePointer).matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
