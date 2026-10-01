import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { scrollToTarget, setLenis } from "@/lib/scroll";

/**
 * One smooth-scroll system for the whole site:
 *   Lenis → GSAP ticker → ScrollTrigger
 * Lenis is driven by GSAP's ticker (single RAF loop) and notifies ScrollTrigger on
 * every scroll, so pinned/scrubbed animations stay in sync with the smoothed position.
 * With reduced motion we skip Lenis and fall back to native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    // Route every in-page anchor through the same scroll system.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href") ?? "";
      const target = hash === "#" || hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target === document.body ? 0 : target, { immediate: prefersReducedMotion() });
      history.pushState(null, "", hash === "#" ? location.pathname : hash);
      if (target !== document.body) target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    // Layout can shift once web fonts swap in; re-measure triggers afterwards.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
