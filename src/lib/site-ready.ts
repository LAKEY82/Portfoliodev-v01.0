import { createContext, useContext, useEffect, useState } from "react";

/** Becomes true once the preloader starts revealing the page; entrance animations wait for it. */
export const SiteReadyContext = createContext(false);

export const useSiteReady = () => useContext(SiteReadyContext);

/**
 * Go-signal for below-the-fold scroll animations (SplitText, ScrollTriggers, image reveals).
 * "off": still loading · "idle": set up gradually in idle time · "now": set up immediately
 * (deep link to a section). Content is fully visible before animations are set up; only the
 * reveal choreography is deferred, so its cost doesn't compete with the preloader and hero.
 */
export type MotionPhase = "off" | "idle" | "now";
export const DeferredMotionContext = createContext<MotionPhase>("off");

// One component per task: React renders each enable as its own small commit, instead of
// ~60 components building their animations in a single long task. Order = render order, so
// sections nearest the top are set up first.
//
// This is also a correctness requirement, not just a performance one: creating many
// ScrollTriggers in one batch while the page is already scrolled (deep link) makes each new
// trigger refresh the unmeasured ones before it, and `once` triggers that are already past
// their start kill themselves mid-refresh — ScrollTrigger then throws ("reading 'end'").
const queue: Array<() => void> = [];
let pumping = false;
let fast = false;
// Idle mode waits for idle time (Safari has no requestIdleCallback: one task per frame).
// Fast mode (deep link) still uses separate tasks, just without waiting for idleness.
const nextTask = (cb: () => void) =>
  fast
    ? window.setTimeout(cb, 0)
    : typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(cb, { timeout: 500 })
      : window.setTimeout(cb, 16);

function pump() {
  const next = queue.shift();
  if (!next) {
    pumping = false;
    return;
  }
  next();
  nextTask(pump);
}

function schedule(task: () => void, urgent: boolean) {
  fast ||= urgent;
  queue.push(task);
  if (!pumping) {
    pumping = true;
    nextTask(pump);
  }
  return () => {
    const i = queue.indexOf(task);
    if (i >= 0) queue.splice(i, 1);
  };
}

/** True once this component may set up its below-the-fold animations. */
export function useDeferredMotion(): boolean {
  const phase = useContext(DeferredMotionContext);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (phase === "off" || enabled) return;
    return schedule(() => setEnabled(true), phase === "now");
  }, [phase, enabled]);

  return enabled;
}
