import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function ProjectSection() {
  const root = useRef<HTMLElement>(null);

  // Desktop deck: as each card slides over the previous one, the previous card recedes.
  useGSAP(
    () => {
      gsap.matchMedia().add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card", root.current);
        cards.slice(0, -1).forEach((card, i) => {
          const scroll = { trigger: cards[i + 1], start: "top bottom", end: "top 20%", scrub: true };
          gsap.to(card.querySelector(".project-inner"), { scale: 0.92, ease: "none", scrollTrigger: scroll });
          gsap.to(card.querySelector(".project-shade"), { opacity: 0.6, ease: "none", scrollTrigger: scroll });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projects" tabIndex={-1} className="gutter py-28 md:py-44">
      <SectionHeader
        index="03"
        label="Selected work"
        title={
          <>
            Selected work <span className="type-serif text-accent-ink">({projects.length})</span>
          </>
        }
        aside={<span>Web &amp; Mobile — Client &amp; Personal</span>}
      />

      <div className="space-y-24 md:space-y-32 lg:space-y-0">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
