import { useRef } from "react";
import { EASE, MQ, gsap, useGSAP } from "@/lib/gsap";
import { useDeferredMotion } from "@/lib/site-ready";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  src: string;
  /** Responsive candidates, e.g. "a-800.webp 800w, a.webp 1600w" — pair with `sizes`. */
  srcSet?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  sizes?: string;
  /** Scroll-linked drift of the image inside its frame (desktop only). */
  parallax?: boolean;
  /** Frame aspect ratio as "w / h" when it varies per image (otherwise set one via className). */
  aspect?: string;
  /** Load immediately (above the fold). */
  priority?: boolean;
};

/**
 * Image that wipes open with clip-path as it enters the viewport, settles from a slight
 * zoom, then drifts gently with scroll. Hover scaling lives on a separate layer so CSS
 * transitions never fight GSAP's inline transforms.
 */
export function RevealImage({
  src,
  srcSet,
  alt,
  className,
  imgClassName,
  width = 1600,
  height = 900,
  sizes = "(min-width: 768px) 66vw, 100vw",
  parallax = true,
  priority = false,
  aspect,
}: RevealImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  const deferredMotion = useDeferredMotion();

  useGSAP(
    () => {
      if (!deferredMotion) return; // below-the-fold: set up after the hero intro (see Portfolio.tsx)
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: frame.current, start: "top 88%", toggleActions: "play none none none" },
        });
        tl.fromTo(
          frame.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE.inOut },
        ).fromTo(img.current, { scale: 1.3 }, { scale: parallax ? 1.08 : 1, duration: 1.8, ease: EASE.expo }, 0);
      });

      if (parallax) {
        mm.add(MQ.desktop, () => {
          gsap.fromTo(
            img.current,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }
    },
    { scope: frame, dependencies: [deferredMotion, parallax] },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden bg-surface", className)} style={aspect ? { aspectRatio: aspect } : undefined}>
      <div className="h-full w-full transition-transform ease-expo [transition-duration:1200ms] group-hover:scale-[1.035]">
        <img
          ref={img}
          src={src}
          srcSet={srcSet}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("h-full w-full object-cover will-change-transform", imgClassName)}
        />
      </div>
    </div>
  );
}
