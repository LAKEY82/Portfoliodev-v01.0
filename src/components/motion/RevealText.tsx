import { useRef, type ElementType, type ReactNode } from "react";
import { EASE, MQ, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /**
   * lines — each line slides up out of a mask when it enters the viewport (headings).
   * scrub — words brighten from dim to full as you scroll through (statements).
   */
  mode?: "lines" | "scrub";
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
};

/** Scroll-triggered text reveal built on GSAP SplitText. Content is fully readable without JS/motion. */
export function RevealText({
  children,
  as: Tag = "div",
  className,
  mode = "lines",
  delay = 0,
  stagger = 0.08,
  start = "top 88%",
  id,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        if (mode === "scrub") {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
            },
          );
          return () => split.revert();
        }

        let revealed = false;
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            // After the first reveal, a re-split (resize / font swap) must not replay the animation.
            if (revealed) return;
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.15,
              delay,
              stagger,
              ease: EASE.expo,
              scrollTrigger: { trigger: el, start, once: true },
              onComplete: () => {
                revealed = true;
              },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref, dependencies: [mode, delay, stagger, start] },
  );

  return (
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
