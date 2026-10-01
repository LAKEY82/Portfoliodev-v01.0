import { ArrowSwap } from "@/components/ui/Button";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One case study. From lg up it is a full-height sticky panel in a stacked deck
 * (see ProjectSection for the recede animation); below lg it is a simple vertical entry.
 */
export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const label = project.linkLabel ?? "View project";
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  const image = (
    <RevealImage
      src={project.image}
      alt={`${project.title} — screenshot`}
      parallax={false}
      sizes="(min-width: 1024px) 58vw, 100vw"
      className="aspect-[16/10] w-full rounded-[3px]"
    />
  );

  return (
    <article className="project-card lg:sticky lg:top-[5.5rem] lg:h-[calc(100svh-6.5rem)] lg:pb-4">
      <div className="project-inner relative flex h-full origin-top flex-col lg:overflow-hidden lg:rounded-[1.25rem] lg:border lg:border-line lg:bg-surface lg:p-8 xl:p-10">
        {/* Meta row */}
        <Reveal
          className="type-meta order-2 mt-7 flex justify-between gap-4 border-t border-line pt-4 text-muted lg:order-none lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:border-0 lg:pt-0"
          y={12}
        >
          <span className="lg:col-span-2">
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className="lg:col-span-3">{project.category}</span>
          <span className="hidden text-right lg:col-span-7 lg:block">{project.tags.join(" · ")}</span>
        </Reveal>

        <div className="contents lg:mt-8 lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-x-6">
          {/* Text */}
          <div className="order-3 mt-6 lg:order-none lg:col-span-5 lg:mt-0 lg:flex lg:flex-col lg:justify-between">
            <RevealText as="h3" className="type-display mb-6 text-title lg:mb-0 lg:text-[clamp(3rem,5.6vw,6.5rem)]" start="top 90%">
              {project.title}
            </RevealText>
            <Reveal y={20}>
              <p className="mb-6 max-w-[44ch] text-[0.95rem] font-[350] leading-relaxed text-muted">{project.description}</p>
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.06em] text-muted lg:hidden">
                {project.tags.join(" · ")}
              </p>
              {project.link ? (
                <a href={project.link} {...external} className="group inline-flex items-center gap-3 text-sm font-medium">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] transition-colors duration-500 ease-expo group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                    <ArrowSwap className="h-4 w-4" />
                  </span>
                  <span className="draw-line pb-0.5">{label}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <p className="type-meta text-muted">No public link</p>
              )}
            </Reveal>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-none lg:col-span-7 lg:self-end">
            {project.link ? (
              <a
                href={project.link}
                {...external}
                data-cursor={project.linkLabel ? "Download" : "View"}
                className="group block"
                tabIndex={-1}
                aria-hidden="true"
              >
                {image}
              </a>
            ) : (
              <div className="group">{image}</div>
            )}
          </div>
        </div>

        {/* Darkens the card as the next one slides over it (animated in ProjectSection). */}
        <div aria-hidden="true" className="project-shade pointer-events-none absolute inset-0 hidden bg-black opacity-0 lg:block" />
      </div>
    </article>
  );
}
