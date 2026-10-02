import { useRef, type RefObject } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { about, profile } from "@/data/portfolio";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SerifAmp } from "@/components/ui/SerifAmp";

/** Counts stats up once when they scroll into view, writing straight to the DOM. */
function useCountUp(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-count]", scope.current);
        els.forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { v: 0 };
          el.textContent = "0";
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => (el.textContent = String(Math.round(counter.v))),
          });
        });
        return () => els.forEach((el) => (el.textContent = el.dataset.count ?? ""));
      });
    },
    { scope },
  );
}

export function About() {
  const root = useRef<HTMLElement>(null);
  useCountUp(root);

  return (
    <section ref={root} id="about" tabIndex={-1} className="gutter py-28 md:py-44">
      <SectionHeader
        index="01"
        label="About"
        title={
          <>
            Engineer by craft,
            {" "}
            <br />
            <span className="type-serif text-accent-ink">designer</span> at heart
          </>
        }
        aside={<span className="hidden sm:inline">{profile.role}</span>}
      />

      <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-6">
        {/* Statement — the key message, revealed word by word with scroll. */}
        <RevealText
          as="p"
          mode="scrub"
          className="text-statement font-normal md:col-span-10 md:col-start-3 [font-stretch:92%]"
        >
          Hi, I&rsquo;m {profile.firstName}. <SerifAmp text={about.statement} />
        </RevealText>

        <Reveal className="type-meta text-muted md:col-span-2 md:row-start-2 md:pt-2" y={16}>
          <p>(Who)</p>
          <p className="mt-1 text-fg">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="mt-4">(Based)</p>
          <p className="mt-1 text-fg">{profile.location}</p>
        </Reveal>

        <Reveal
          className="space-y-6 text-lead font-[350] text-muted md:col-span-5 md:col-start-3 md:row-start-2"
          stagger={0.12}
        >
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <dl className="grid grid-cols-3 gap-4 self-end border-t border-line pt-6 md:col-span-4 md:col-start-9 md:row-start-2 md:grid-cols-1 md:gap-0 md:border-t-0 md:pt-0">
          {about.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse md:flex-row md:items-baseline md:justify-between md:border-t md:border-line md:py-4">
              <dt className="type-meta mt-2 text-muted md:mt-0">{stat.label}</dt>
              <dd className="type-display text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.03em]">
                <span data-count={stat.value}>{stat.value}</span>
                <span className="text-accent-ink">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
