import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, scrollToTarget, unlockScroll } from "@/lib/scroll";
import { profile } from "@/data/portfolio";

const MIN_DURATION = 0.8; // seconds — long enough to read, short enough not to feel like a delay
const MAX_WAIT = 6000; // ms — never hold the site hostage to a slow asset

/**
 * Full-screen intro. Progress reflects real work (web fonts, window load, above-the-fold
 * images), eased so the counter never jumps. When everything is ready the type exits,
 * the panel wipes upward, and `onReveal` lets the hero start its entrance underneath.
 */
export function Preloader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      let alive = true;
      let finished = false;
      let revealed = false;

      lockScroll();
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      const progress = { value: 0 };
      const render = () => {
        if (counter.current) counter.current.textContent = String(Math.round(progress.value));
      };

      if (!reduced) {
        gsap.from(".pl-rise", { yPercent: 110, duration: 1, ease: EASE.expo, stagger: 0.04 });
      }

      const tasks: Promise<unknown>[] = [
        document.fonts ? document.fonts.ready : Promise.resolve(),
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((resolve) => window.addEventListener("load", resolve, { once: true })),
        ...Array.from(document.querySelectorAll<HTMLImageElement>("img[data-critical]")).map((img) =>
          img.decode().catch(() => undefined),
        ),
      ];

      let done = 0;
      tasks.forEach((task) =>
        task.then(() => {
          if (!alive || finished) return;
          done += 1;
          gsap.to(progress, { value: (done / tasks.length) * 90, duration: 0.8, ease: "power2.out", onUpdate: render, overwrite: true });
        }),
      );

      const reveal = () => {
        if (revealed) return;
        revealed = true;
        unlockScroll();
        onReveal();
        ScrollTrigger.refresh();
        if (location.hash.length > 1) scrollToTarget(location.hash, { immediate: true });
      };

      const exit = () => {
        if (!alive) return;
        if (reduced) {
          gsap.to(root.current, { autoAlpha: 0, duration: 0.35, onStart: reveal });
          return;
        }
        gsap
          .timeline()
          .to(".pl-rise", { yPercent: -110, duration: 0.55, ease: "power3.in", stagger: 0.02 })
          .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: EASE.inOut }, "-=0.25")
          .add(reveal, "-=0.8")
          .set(root.current, { display: "none" });
      };

      const startedAt = performance.now();
      const finish = () => {
        if (!alive || finished) return;
        finished = true;
        const elapsed = (performance.now() - startedAt) / 1000;
        gsap.to(progress, {
          value: 100,
          duration: reduced ? 0 : 0.55,
          delay: reduced ? 0 : Math.max(0, MIN_DURATION - elapsed),
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: render,
          onComplete: exit,
        });
      };

      Promise.all(tasks).then(finish);
      const safety = window.setTimeout(finish, MAX_WAIT);

      return () => {
        alive = false;
        window.clearTimeout(safety);
        if (!revealed) unlockScroll();
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg text-fg gutter py-5 md:py-7 [clip-path:inset(0%_0%_0%_0%)]"
    >
      <div className="type-meta flex items-start justify-between text-muted">
        <span className="mask"><span className="pl-rise block">{profile.handle}</span></span>
        <span className="mask"><span className="pl-rise block">©{new Date().getFullYear()}</span></span>
      </div>

      {/* One idea only: a giant condensed counter. */}
      <div className="flex items-end justify-between gap-6">
        <div className="type-meta mb-2 text-muted">
          <span className="mask"><span className="pl-rise block">{profile.firstName} {profile.lastName}</span></span>
          <span className="mask"><span className="pl-rise block">Portfolio</span></span>
        </div>
        <p className="type-display flex items-start text-[clamp(6rem,min(24vw,42svh),22rem)] leading-[0.8] tracking-[-0.03em] tabular-nums">
          <span className="mask">
            <span ref={counter} className="pl-rise block">0</span>
          </span>
          <span className="mask pr-[0.06em]">
            <span className="pl-rise block text-[0.4em] text-accent-ink">%</span>
          </span>
        </p>
      </div>
    </div>
  );
}
