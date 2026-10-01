import { useEffect, useRef } from "react";
import { EASE, gsap, MQ, useGSAP } from "@/lib/gsap";
import { mailtoLink, navItems, profile, socials } from "@/data/portfolio";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { LocalTime } from "@/components/ui/LocalTime";
import { SerifAmp } from "@/components/ui/SerifAmp";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const wordmark = useRef<HTMLParagraphElement>(null);
  const wordmarkText = useRef<HTMLSpanElement>(null);

  // Fit the wordmark to the exact width available. Viewport units can't do this reliably:
  // 100vw includes the scrollbar, and the real text width depends on the loaded font.
  useEffect(() => {
    const box = wordmark.current;
    const text = wordmarkText.current;
    if (!box || !text) return;

    const fit = () => {
      box.style.fontSize = "";
      const available = box.clientWidth;
      const needed = text.offsetWidth;
      if (!available || !needed) return;
      const current = parseFloat(getComputedStyle(box).fontSize);
      // 0.995 leaves room for the last glyph's overhang so nothing is clipped by the mask.
      box.style.fontSize = `${(current * available * 0.995) / needed}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from(".wordmark-char", {
          yPercent: 100,
          duration: 1.2,
          ease: EASE.expo,
          stagger: 0.04,
          scrollTrigger: { trigger: ".wordmark", start: "top 95%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="panel-invert gutter overflow-hidden pt-8 [container-type:inline-size] md:pt-12">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-10 text-sm md:grid-cols-12">
        <div className="col-span-2 md:col-span-3">
          <p className="type-display text-2xl tracking-[-0.03em]">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="mt-2 max-w-[30ch] text-muted"><SerifAmp text={profile.role} /></p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2 md:col-start-5">
          <p className="type-meta mb-4 text-muted">Index</p>
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <AnimatedLink href={item.href}>{item.label}</AnimatedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="type-meta mb-4 text-muted">Socials</p>
          <ul className="space-y-1.5">
            {socials.map((s) => (
              <li key={s.label}>
                <AnimatedLink href={s.href} external>
                  {s.label}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4 md:col-start-9">
          <p className="type-meta mb-4 text-muted">Contact</p>
          <AnimatedLink href={mailtoLink}>
            {profile.email}
          </AnimatedLink>
          <p className="mt-1.5 text-muted">
            {profile.location}, <LocalTime />
          </p>
        </div>
      </div>

      {/* Closing wordmark — fitted to span the full content width (see effect above). */}
      <p
        ref={wordmark}
        aria-hidden="true"
        className="wordmark type-display mask mt-16 whitespace-nowrap text-[calc(100cqi/6.6)] leading-[0.8] tracking-[-0.03em] md:mt-24"
      >
        <span ref={wordmarkText} className="inline-block">
          {`${profile.firstName} ${profile.lastName}`.split("").map((char, i) => (
          <span key={i} className="wordmark-char inline-block">
            {char === " " ? " " : char}
          </span>
          ))}
        </span>
      </p>

      <div className="type-meta flex flex-col-reverse gap-4 border-t border-line py-5 text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. All rights reserved.
        </p>
        <a href="#home" className="roll-host group inline-flex items-center gap-2 hover:text-fg">
          Back to top
          <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-expo group-hover:-translate-y-1">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
