import { Fragment, useRef } from "react";
import { MQ, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  /** Seconds for one full loop at rest. */
  duration?: number;
  /** 1 = right-to-left, -1 = left-to-right. */
  direction?: 1 | -1;
  variant?: "solid" | "outline";
  className?: string;
};

/**
 * Infinite moving typography. Driven by one GSAP ticker callback that only runs while the
 * marquee is on screen; scroll velocity briefly speeds it up and scroll direction flips it.
 * Purely decorative, so it is hidden from assistive tech.
 */
export function Marquee({ items, duration = 28, direction = 1, variant = "solid", className }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const setX = gsap.quickSetter(track.current, "xPercent");
        const wrap = gsap.utils.wrap(-50, 0);
        const speed = 50 / duration; // percent of track per second (one copy = 50%)
        let x = direction === 1 ? 0 : -50;
        let boost = 0;
        let scrollDir = 1;

        const tick = (_time: number, deltaMs: number) => {
          const dt = Math.min(deltaMs, 64) / 1000;
          x = wrap(x - speed * (1 + boost) * direction * scrollDir * dt);
          setX(x);
          boost *= Math.pow(0.9, dt * 60);
        };

        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
          onUpdate: (self) => {
            scrollDir = self.direction;
            boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 350, 5));
          },
        });
        if (trigger.isActive) gsap.ticker.add(tick);

        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: root, dependencies: [duration, direction] },
  );

  const group = (copy: number) => (
    <div className="flex shrink-0 items-center" key={copy}>
      {/* Items twice per copy so a single copy is always wider than the viewport. */}
      {[...items, ...items].map((item, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap px-[0.18em]">{item}</span>
          <span className="mx-[0.22em] inline-block h-[0.16em] w-[0.16em] shrink-0 rounded-full bg-accent" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div ref={root} aria-hidden="true" className={cn("relative select-none overflow-hidden", className)}>
      <div
        ref={track}
        className={cn(
          "type-display flex w-max text-[clamp(3.25rem,9.5vw,10rem)] leading-[0.85] will-change-transform",
          variant === "outline" && "text-transparent [-webkit-text-stroke:1px_var(--line-strong)]",
        )}
      >
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
