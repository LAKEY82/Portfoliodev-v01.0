import { useRef } from "react";
import { EASE, gsap, MQ, useGSAP } from "@/lib/gsap";
import { useSiteReady } from "@/lib/site-ready";
import { profile } from "@/data/portfolio";
import { LocalTime } from "@/components/ui/LocalTime";

/** Splits a word into masked characters for the entrance animation (hidden from screen readers). */
function Chars({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="inline-flex">
      {text.split("").map((char, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ready = useSiteReady();

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap
          .timeline({ defaults: { ease: EASE.expo } })
          .from(".hero-char", { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.035 })
          .fromTo(
            ".hero-portrait",
            { clipPath: "inset(50% 50% 50% 50% round 999px)" },
            { clipPath: "inset(0% 0% 0% 0% round 999px)", duration: 1.4, ease: EASE.inOut },
            0.35,
          )
          .from(".hero-portrait img", { scale: 1.5, duration: 1.8 }, 0.35)
          .from(".hero-meta", { yPercent: 110, duration: 1.1, stagger: 0.06 }, 0.55)
          .from(".hero-rule", { scaleX: 0, duration: 1.4, ease: EASE.inOut }, 0.4);
      });

      // Scroll-out: the name drifts up and the portrait eases back as the hero leaves.
      mm.add(MQ.desktop, () => {
        const scroll = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-name", { yPercent: -18, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-portrait img", { scale: 1.15, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-foot", { opacity: 0, y: -40, ease: "none", scrollTrigger: { ...scroll, end: "40% top" } });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      ref={root}
      id="home"
      tabIndex={-1}
      className="gutter relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-6 pt-24 md:pb-8 md:pt-28"
    >
      {/* Top metadata row */}
      <div className="type-meta flex justify-between gap-4 text-muted lg:grid lg:grid-cols-12">
        <div className="mask lg:col-span-3">
          <p className="hero-meta">(Portfolio) ©{new Date().getFullYear()}</p>
        </div>
        <div className="mask hidden lg:col-span-5 lg:col-start-5 lg:block">
          <p className="hero-meta">{profile.role}</p>
        </div>
        <div className="mask text-right lg:col-span-3 lg:col-start-10">
          <p className="hero-meta inline-flex items-center gap-2 whitespace-nowrap text-fg">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Freelance contracts open
          </p>
        </div>
      </div>

      {/* Name */}
      <h1
        className="hero-name type-display my-auto py-8 text-[clamp(3.5rem,min(26vw,calc(62svh-12.75rem)),30rem)] leading-[0.8] tracking-[-0.03em] md:py-4 md:text-[clamp(3.5rem,min(26.5vw,calc(62svh-12.75rem)),30rem)]"
        aria-label={`${profile.firstName} ${profile.lastName} — ${profile.role}`}
      >
        <span className="mask">
          <Chars text={profile.firstName} />
        </span>
        <span className="mask flex items-center justify-end gap-[0.12em]">
          <span className="hero-portrait relative block h-[0.74em] w-[0.46em] shrink-0 overflow-hidden rounded-full bg-surface">
            <img
              src={profile.portrait}
              alt={`Portrait of ${profile.firstName} ${profile.lastName}`}
              data-critical
              width={539}
              height={610}
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </span>
          <Chars text={profile.lastName} />
        </span>
      </h1>

      {/* Bottom row */}
      <div className="hero-foot">
        <div className="hero-rule mb-5 h-px origin-left bg-line md:mb-6" />
        <div className="grid grid-cols-2 items-end gap-x-4 gap-y-6 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5 md:col-start-5 md:row-start-1">
            <div className="mask">
              <p className="hero-meta type-serif max-w-[26ch] text-[clamp(1.35rem,2.2vw,2.1rem)] leading-[1.1]">
                {profile.tagline}
              </p>
            </div>
          </div>
          <div className="mask md:col-span-3 md:row-start-1">
            <a href="#about" className="hero-meta type-meta group inline-flex items-center gap-3 text-muted hover:text-fg">
              <span className="relative block h-8 w-px overflow-hidden bg-line">
                <span className="scroll-cue absolute inset-0 bg-accent" />
              </span>
              Scroll to explore
            </a>
          </div>
          <div className="mask text-right md:col-span-3 md:col-start-10 md:row-start-1">
            <p className="hero-meta type-meta text-muted">
              {profile.location} — <LocalTime className="text-fg" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
