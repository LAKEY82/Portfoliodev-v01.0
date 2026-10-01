import { useCallback, useRef, useState } from "react";
import { EASE, gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSiteReady } from "@/lib/site-ready";
import { navItems, profile } from "@/data/portfolio";
import { AnimatedLink, RollText } from "@/components/ui/AnimatedLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Magnetic } from "@/components/motion/Magnetic";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const root = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const ready = useSiteReady();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Scroll-driven state is written to data attributes, so scrolling never re-renders React.
  useGSAP(
    () => {
      const header = root.current;
      if (!header) return;

      // Compare against scroll position (not isActive) so the state holds at the very bottom too.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const scrolled = String(self.scroll() > 60);
          if (header.dataset.scrolled !== scrolled) header.dataset.scrolled = scrolled;
        },
      });

      navItems.forEach(({ href }) => {
        const section = document.querySelector(href);
        const link = header.querySelector<HTMLElement>(`.nav-link[href="${href}"]`);
        if (!section || !link) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => (link.dataset.active = String(self.isActive)),
        });
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!ready) return;
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from(".hdr-in", { yPercent: -120, opacity: 0, duration: 1.1, ease: EASE.expo, stagger: 0.05, delay: 0.5 });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <header ref={root} className="site-header fixed inset-x-0 top-0 z-50" data-scrolled="false">
      {/* z-10 keeps the bar (and its Close button) above the full-screen mobile menu. */}
      <div className="gutter relative z-10 pt-3 md:pt-4">
        <div className="header-bar -mx-3 flex items-center justify-between gap-4 rounded-full border border-transparent px-3 py-2 transition-[background-color,border-color,padding] duration-500 ease-expo md:-mx-4 md:px-4">
          <a href="#home" className="hdr-in roll-host group flex items-center gap-3" aria-label={`${profile.firstName} ${profile.lastName} — back to top`}>
            <span className="type-display flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[0.95rem] tracking-[-0.04em] text-accent-fg">
              LP
            </span>
            <span className="header-sub hidden flex-col leading-tight transition-[opacity,transform] duration-500 ease-expo sm:flex">
              <span className="text-sm font-medium">
                {profile.firstName} {profile.lastName}
              </span>
              <span className="type-meta text-[0.625rem] text-muted">Software Engineer</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {navItems.map((item) => (
                <li key={item.href} className="hdr-in">
                  <AnimatedLink
                    href={item.href}
                    className={cn(
                      "nav-link relative text-sm text-muted transition-colors duration-300 hover:text-fg",
                      // active indicator dot
                      "before:absolute before:-left-3 before:top-1/2 before:h-1 before:w-1 before:-translate-y-1/2 before:scale-0 before:rounded-full before:bg-accent before:transition-transform before:duration-500",
                    )}
                  >
                    {item.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle className="hdr-in" />
            <Magnetic className="hdr-in hidden md:inline-block" strength={0.25}>
              <a
                href="#contact"
                className="roll-host inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors duration-500 hover:bg-accent hover:text-accent-fg"
              >
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <RollText>Let&rsquo;s talk</RollText>
              </a>
            </Magnetic>
            <button
              ref={toggleRef}
              type="button"
              className="hdr-in roll-host flex h-9 items-center gap-2.5 rounded-full border border-[color:var(--line-strong)] pl-4 pr-3 text-sm md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <RollText>{menuOpen ? "Close" : "Menu"}</RollText>
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-fg transition-transform duration-500 ease-expo",
                    menuOpen && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-fg transition-transform duration-500 ease-expo",
                    menuOpen && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} toggleRef={toggleRef} />
    </header>
  );
}
