import { experience } from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SerifAmp } from "@/components/ui/SerifAmp";

export function Experience() {
  return (
    <section id="experience" tabIndex={-1} className="gutter py-28 md:py-44">
      <SectionHeader
        index="04"
        label="Experience"
        title={
          <>
            Career <span className="type-serif text-accent-ink">so</span> far
          </>
        }
        aside={<span className="hidden sm:inline">Professional history</span>}
      />

      <ol>
        {experience.map((item) => (
          <li key={`${item.company}-${item.period}`} className="group border-t border-line last:border-b">
            <Reveal className="grid grid-cols-1 gap-x-6 gap-y-4 py-8 md:grid-cols-12 md:py-12" y={24}>
              <div className="type-meta pt-1 text-muted md:col-span-3">
                <p className="text-fg">{item.period}</p>
                <p className="mt-1.5">{item.location}</p>
              </div>
              <div className="md:col-span-4">
                <h3 className="type-display text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[0.95] tracking-[-0.025em] transition-colors duration-500 group-hover:text-accent-ink">
                  <SerifAmp text={item.role} />
                </h3>
                <p className="type-meta mt-3 text-muted">{item.company}</p>
              </div>
              <p className="max-w-[56ch] font-[350] leading-relaxed text-muted md:col-span-5">{item.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
