import type Lenis from "lenis";

// Module-level handle to the single Lenis instance created by <SmoothScroll />.
// Kept outside React so scroll helpers never trigger re-renders.
let lenis: Lenis | null = null;
let lockCount = 0;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
  if (lenis && lockCount > 0) lenis.stop();
};

export const getLenis = () => lenis;

export function scrollToTarget(target: string | HTMLElement | number, opts: { immediate?: boolean } = {}) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;

  if (lenis) {
    lenis.scrollTo(el, { immediate: opts.immediate, duration: 1.4, force: true });
    return;
  }

  const top = typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
}

/** Reference-counted scroll lock (preloader, mobile menu, …). */
export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    lenis?.stop();
    document.documentElement.classList.add("scroll-locked");
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.classList.remove("scroll-locked");
    lenis?.start();
  }
}
