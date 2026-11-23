import { useRef, type ElementType, type ReactNode } from "react";
import { EASE, MQ, gsap, useGSAP } from "@/lib/gsap";
import { useDeferredMotion } from "@/lib/site-ready";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate direct children one after another instead of the wrapper as a whole. */
  stagger?: number;
  y?: number;
};

/** Subtle fade + rise for secondary content. Primary content should use RevealText / RevealImage. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, stagger, y = 28 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  const deferredMotion = useDeferredMotion();

  useGSAP(
    () => {
      if (!deferredMotion) return; // below-the-fold: set up after the hero intro (see Portfolio.tsx)
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          y,
          opacity: 0,
          duration: 1.1,
          delay,
          stagger,
          ease: EASE.expo,
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        });
      });
    },
    { scope: ref, dependencies: [deferredMotion] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
