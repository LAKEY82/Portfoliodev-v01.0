import { useEffect, useRef, type RefObject } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { mailtoLink, navItems, profile, socials } from "@/data/portfolio";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

/** Full-screen menu. A single paused timeline plays forward to open and reverses to close. */
export function MobileMenu({ open, onClose, toggleRef }: MobileMenuProps) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: EASE.expo },
          onReverseComplete: () => gsap.set(root.current, { visibility: "hidden" }),
        })
        .fromTo(
          root.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: reduced ? 0.01 : 0.9, ease: EASE.inOut },
        )
        .from(".mm-item", { yPercent: 110, duration: reduced ? 0.01 : 1, stagger: 0.06 }, reduced ? 0 : "-=0.45")
        .from(".mm-foot", { opacity: 0, y: 16, duration: reduced ? 0.01 : 0.8, stagger: 0.05 }, "<0.2");
    },
    { scope: root },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;

    if (!open) {
      timeline.timeScale(1.6).reverse();
      return;
    }

    gsap.set(root.current, { visibility: "visible" });
    timeline.timeScale(1).play();
    lockScroll();
    root.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !root.current) return;
      // Keep focus inside the menu (plus the close button in the header).
      const focusables = [toggleRef.current, ...root.current.querySelectorAll<HTMLElement>("a, button")].filter(
        (el): el is HTMLElement => !!el,
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) onClose();
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      unlockScroll();
    };
  }, [open, onClose, toggleRef]);

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-0 flex flex-col justify-between bg-surface gutter pb-8 pt-28 md:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="space-y-1">
          {navItems.map((item, i) => (
            <li key={item.href} className="mask">
              <a
                href={item.href}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className="mm-item group flex items-baseline gap-4 py-1"
              >
                <span className="type-meta w-6 text-muted">0{i + 1}</span>
                <span className="type-display text-[clamp(3rem,15vw,5.5rem)] leading-[0.9] tracking-[-0.035em] transition-colors duration-300 group-hover:text-accent-ink">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-2 gap-6 border-t border-line pt-6">
        <div className="mm-foot">
          <p className="type-meta mb-3 text-muted">Get in touch</p>
          <a href={mailtoLink} tabIndex={open ? 0 : -1} className="break-all text-sm">
            {profile.email}
          </a>
        </div>
        <ul className="mm-foot space-y-1.5 text-sm">
          <li className="type-meta mb-3 text-muted">Elsewhere</li>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
