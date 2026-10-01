import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

const INTERACTIVE = "a, button, [role='button'], label, select, summary";

/**
 * Desktop-only cursor: an instant centre dot plus a trailing ring.
 * States are read from the DOM (`data-cursor="View"` shows a label) via event delegation,
 * so no React state changes while the mouse moves. It is pointer-events: none and never
 * intercepts clicks.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion() || !dot.current || !ring.current || !label.current) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    const labelEl = label.current;

    document.documentElement.classList.add("has-cursor");
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickSetter(dotEl, "x", "px");
    const dotY = gsap.quickSetter(dotEl, "y", "px");
    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3.out" });
    let visible = false;

    const setState = (state: string, text = "") => {
      ringEl.dataset.state = state;
      dotEl.dataset.state = state;
      labelEl.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!visible) {
        visible = true;
        gsap.set(ringEl, { x: e.clientX, y: e.clientY });
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 });
      }
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) return setState("label", labelled.dataset.cursor);
      if (target?.closest("input, textarea")) return setState("text");
      if (target?.closest(INTERACTIVE)) return setState("hover");
      setState("default");
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.3 });
    };
    const onDown = () => ringEl.classList.add("is-pressed");
    const onUp = () => ringEl.classList.remove("is-pressed");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gsap.killTweensOf([dotEl, ringEl]);
    };
  }, []);

  // No wrapper element: a fixed, z-indexed parent would isolate mix-blend-mode, and the
  // white "difference" blend is what keeps the cursor visible on both dark and paper panels.
  const onlyFinePointer = "pointer-events-none fixed left-0 top-0 z-[200] hidden opacity-0 [@media(hover:hover)_and_(pointer:fine)]:flex";
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        data-state="default"
        className={
          onlyFinePointer +
          " items-center justify-center rounded-full border border-white/70 mix-blend-difference h-8 w-8 " +
          "transition-[width,height,background-color,border-color] duration-500 ease-expo " +
          "data-[state=hover]:h-14 data-[state=hover]:w-14 data-[state=hover]:border-white " +
          "data-[state=label]:h-[5.5rem] data-[state=label]:w-[5.5rem] data-[state=label]:border-accent data-[state=label]:bg-accent data-[state=label]:mix-blend-normal " +
          "data-[state=text]:h-6 data-[state=text]:w-6 data-[state=text]:border-transparent " +
          "[&.is-pressed]:h-6 [&.is-pressed]:w-6"
        }
      >
        <span
          ref={label}
          className="type-meta scale-50 text-[0.6875rem] font-medium text-accent-fg opacity-0 transition-[opacity,transform] duration-300 [[data-state=label]>&]:scale-100 [[data-state=label]>&]:opacity-100"
        />
      </div>
      <div
        ref={dot}
        aria-hidden="true"
        data-state="default"
        className={
          onlyFinePointer +
          " h-1.5 w-1.5 rounded-full bg-white mix-blend-difference transition-transform duration-300 data-[state=label]:scale-0 data-[state=text]:h-5 data-[state=text]:w-[2px] data-[state=text]:rounded-none"
        }
      />
    </>
  );
}
