import { useRef } from "react";
import { EASE, MQ, gsap, useGSAP } from "@/lib/gsap";
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
}: RevealImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: frame.current, start: "top 88%", once: true },
        });
        tl.fromTo(
          frame.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE.inOut },
        ).fromTo(img.current, { scale: 1.3 }, { scale: 1.08, duration: 1.8, ease: EASE.expo }, 0);
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
    { scope: frame, dependencies: [parallax] },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden bg-surface", className)}>
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
