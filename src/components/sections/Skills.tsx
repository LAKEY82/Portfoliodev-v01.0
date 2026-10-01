import { useRef } from "react";
import { EASE, gsap, MQ, useGSAP } from "@/lib/gsap";
import { skillCategories } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SerifAmp } from "@/components/ui/SerifAmp";

/** Toolkit as an editorial index: one ruled row per discipline. */
export function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>(".skill-row", root.current).forEach((row) => {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
            .from(row.querySelector(".skill-rule"), { scaleX: 0, duration: 1.3, ease: EASE.inOut })
            .from(row.querySelectorAll(".skill-in"), { yPercent: 105, duration: 1, ease: EASE.expo, stagger: 0.06 }, 0.2);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="skills" tabIndex={-1} className="gutter py-28 md:py-44">
      <SectionHeader
        index="02"
        label="Toolkit"
        title={
          <>
            Tools of <span className="type-serif text-accent-ink">the</span> trade
          </>
        }
        aside={<span className="hidden sm:inline">Web &amp; Mobile</span>}
      />

      <ul>
        {skillCategories.map((cat, i) => (
          <li key={cat.title} className="skill-row group relative">
            <div className="skill-rule h-px origin-left bg-line" />
            <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 md:py-10">
              <span className="mask col-span-2 md:col-span-1">
                <span className="skill-in type-meta block text-muted">0{i + 1}</span>
              </span>
              <h3 className="mask col-span-10 md:col-span-5">
                <span className="skill-in type-display block text-title transition-colors duration-500 group-hover:text-accent-ink">
                  <SerifAmp text={cat.title} />
                </span>
              </h3>
              <div className="mask col-span-10 col-start-3 md:col-span-6 md:col-start-7">
                <ul className="skill-in flex flex-wrap gap-x-1 gap-y-2 font-mono text-sm text-muted">
                  {cat.skills.map((skill, j) => (
                    <li key={skill} className="transition-colors duration-300 group-hover:text-fg">
                      {skill}
                      {j < cat.skills.length - 1 && <span className="ml-1 text-[color:var(--line-strong)]">/</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
        <li aria-hidden="true" className="h-px bg-line" />
      </ul>
    </section>
  );
}
