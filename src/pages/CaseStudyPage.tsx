import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useDeferredMotion } from "@/lib/site-ready";
import type { CaseBlock, CaseImage, CaseStudy } from "@/data/case-studies";
import { PageShell } from "@/components/PageShell";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { SerifAmp } from "@/components/ui/SerifAmp";

const pad = (n: number) => String(n).padStart(2, "0");
const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const bigTitle = "type-display mb-14 max-w-[16ch] text-[clamp(2.5rem,6.5vw,7rem)] leading-[0.88] tracking-[-0.02em] md:mb-20";

/** Section metadata row: "(03) — How it works ............ aside". */
function Meta({ index, label, aside }: { index: number; label: string; aside?: string }) {
  return (
    <Reveal className="type-meta mb-10 flex items-center justify-between gap-6 border-t border-line pt-4 text-muted md:mb-14" y={12}>
      <span>
        ({pad(index)}) — {label}
      </span>
      {aside && <span className="hidden text-right sm:inline">{aside}</span>}
    </Reveal>
  );
}

function Section({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="gutter py-24 md:py-36">
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ blocks */

function TextBlock({ b, index, name, id }: { b: Extract<CaseBlock, { kind: "text" }>; index: number; name: string; id?: string }) {
  return (
    <Section id={id}>
      <Meta index={index} label={b.label} aside={name} />
      <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-6">
        <RevealText as="h2" className="type-display text-[clamp(2.5rem,5.4vw,5.75rem)] leading-[0.9] tracking-[-0.02em] md:col-span-5">
          <SerifAmp text={b.title} />
        </RevealText>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal className="space-y-6 text-lead font-[350] text-muted" stagger={0.1}>
            {b.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          {b.pull && (
            // An editorial statement (the author's framing), not a quotation from anyone.
            <Reveal as="p" className="type-serif my-12 border-l-2 border-[color:var(--cs-fill)] pl-6 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.15]">
              {b.pull}
            </Reveal>
          )}
          {b.cards && (
            <ul className={"grid gap-px overflow-hidden rounded-[1rem] border border-line bg-line sm:grid-cols-3 " + (b.pull ? "" : "mt-12")}>
              {b.cards.map((c, i) => (
                <li key={c.title} className="bg-bg p-5">
                  <p className="type-meta mb-3 text-muted">{pad(i + 1)}</p>
                  <p className="mb-2 font-medium">{c.title}</p>
                  <p className="text-sm font-[350] leading-relaxed text-muted">{c.text}</p>
                </li>
              ))}
            </ul>
          )}
          {b.list && (
            <ol className="mt-12 space-y-px overflow-hidden rounded-[1rem] border border-line bg-line">
              {b.list.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 bg-bg p-5 md:p-6">
                  <span className="type-meta pt-1 text-[color:var(--cs-ink)]">{pad(i + 1)}</span>
                  <div>
                    <p className="mb-1.5 font-medium">{item.title}</p>
                    <p className="text-sm font-[350] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </Section>
  );
}

/** Numbered steps joined by a line that draws in as the section scrolls through. */
function StepsBlock({ b, index }: { b: Extract<CaseBlock, { kind: "steps" }>; index: number }) {
  const root = useRef<HTMLDivElement>(null);
  const deferredMotion = useDeferredMotion();

  useGSAP(
    () => {
      if (!deferredMotion) return;
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.fromTo(
          ".steps-line",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 55%", scrub: 0.5 } },
        );
      });
    },
    { scope: root, dependencies: [deferredMotion] },
  );

  return (
    <Section>
      <Meta index={index} label={b.label} aside={b.aside} />
      <RevealText as="h2" className={bigTitle}>
        {b.title}
      </RevealText>
      <div ref={root} className="relative">
        <div aria-hidden="true" className="absolute left-0 right-0 top-[1.375rem] hidden h-px bg-line md:block">
          <div className="steps-line h-full origin-left bg-accent" />
        </div>
        <ol
          className="relative grid gap-10 md:grid-cols-[repeat(var(--n),minmax(0,1fr))] md:gap-6"
          style={{ "--n": b.steps.length } as CSSProperties}
        >
          {b.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal y={20} delay={i * 0.06}>
                <span
                  className={
                    "mb-6 flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs " +
                    (s.highlight
                      ? "border-[color:var(--cs-fill)] bg-[color:var(--cs-fill)] text-[color:var(--cs-on-fill)] shadow-[0_0_32px_var(--cs-glow)]"
                      : "border-[color:var(--line-strong)] bg-bg text-fg")
                  }
                >
                  {pad(i + 1)}
                </span>
                <h3 className="type-display mb-3 text-[clamp(1.6rem,2.2vw,2.2rem)] leading-none">
                  {s.title}
                  {s.highlight && <span className="type-meta ml-2 align-middle text-[0.625rem] text-[color:var(--cs-ink)]">{s.highlight}</span>}
                </h3>
                <p className="max-w-[30ch] text-[0.95rem] font-[350] leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Shot({ img, kind, sizes }: { img: CaseImage; kind: "wide" | "phone" | "page"; sizes: string }) {
  const frame =
    kind === "phone"
      ? "w-full rounded-[1.75rem] border-[5px] border-surface outline outline-1 outline-[color:var(--line-strong)]"
      : "w-full rounded-[0.75rem] border border-line";
  return (
    <RevealImage
      src={img.src}
      srcSet={img.srcSet}
      alt={img.alt}
      width={img.width}
      height={img.height}
      aspect={`${img.width} / ${img.height}`}
      sizes={sizes}
      parallax={false}
      className={frame}
    />
  );
}

function CompareBlock({ b, index }: { b: Extract<CaseBlock, { kind: "compare" }>; index: number }) {
  const label = (text: string, after: boolean) => (
    <figcaption className={"type-meta mb-3 flex items-center gap-2 " + (after ? "text-fg" : "text-muted")}>
      <span aria-hidden="true" className={"h-1.5 w-1.5 rounded-full " + (after ? "bg-[color:var(--cs-fill)]" : "bg-[color:var(--line-strong)]")} />
      {text}
    </figcaption>
  );
  const width = { wide: "", page: "mx-auto max-w-[56rem]", phone: "mx-auto max-w-[36rem]" };
  const sizes = { wide: "(min-width: 768px) 47vw, 100vw", page: "(min-width: 768px) 28rem, 46vw", phone: "(min-width: 768px) 17rem, 45vw" };

  return (
    <Section>
      <Meta index={index} label={b.label} aside={`${b.beforeLabel.split(" · ")[1] ?? ""} → ${b.afterLabel.split(" · ")[1] ?? ""}`} />
      <RevealText as="h2" className={bigTitle}>
        {b.title}
      </RevealText>
      {b.intro && <Reveal as="p" className="mb-14 max-w-[60ch] text-lead font-[350] text-muted">{b.intro}</Reveal>}

      <div className="space-y-20 md:space-y-28">
        {b.pairs.map((pair) => (
          <div key={pair.caption} className={width[pair.layout]}>
            <div className={"grid items-start gap-4 md:gap-8 " + (pair.layout === "wide" ? "md:grid-cols-2" : "grid-cols-2")}>
              <figure>
                {label(b.beforeLabel, false)}
                <Shot img={pair.before} kind={pair.layout} sizes={sizes[pair.layout]} />
              </figure>
              <figure>
                {label(b.afterLabel, true)}
                <Shot img={pair.after} kind={pair.layout} sizes={sizes[pair.layout]} />
              </figure>
            </div>
            <Reveal as="p" className="type-meta mt-5 max-w-[70ch] leading-relaxed text-muted" y={10}>
              {pair.caption}
            </Reveal>
          </div>
        ))}
      </div>

      {b.table && (
        <div className="mt-24 md:mt-32">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {b.beforeLabel} compared with {b.afterLabel}
            </caption>
            <thead>
              <tr className="type-meta border-y border-line text-muted">
                <th scope="col" className="py-4 pr-4 font-normal md:w-1/3">
                  <span className="sr-only">Measure</span>
                </th>
                <th scope="col" className="py-4 pr-4 font-normal">{b.beforeLabel}</th>
                <th scope="col" className="py-4 font-normal">{b.afterLabel}</th>
              </tr>
            </thead>
            <tbody>
              {b.table.rows.map((r) => (
                <tr key={r.label} className="border-b border-line align-baseline">
                  <th scope="row" className="type-meta py-5 pr-4 font-normal text-muted">{r.label}</th>
                  <td className="py-5 pr-4 font-[350] text-muted">{r.before}</td>
                  <td className="py-5 text-[clamp(1rem,1.3vw,1.2rem)]">{r.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {b.table.note && <p className="type-meta mt-5 max-w-[80ch] leading-relaxed text-muted">{b.table.note}</p>}
        </div>
      )}
    </Section>
  );
}

function ScreensBlock({ b, index }: { b: Extract<CaseBlock, { kind: "screens" }>; index: number }) {
  return (
    <Section>
      <Meta index={index} label={b.label} aside={b.aside} />
      <RevealText as="h2" className={bigTitle}>
        {b.title}
      </RevealText>
      <div className={"grid items-end gap-6 " + (b.phone ? "md:grid-cols-12" : "")}>
        <figure className={b.phone ? "md:col-span-9" : ""}>
          <Shot img={b.wide} kind="wide" sizes={b.phone ? "(min-width: 768px) 70vw, 100vw" : "94vw"} />
        </figure>
        {b.phone && (
          <figure className="mx-auto w-[60%] max-w-[17rem] md:col-span-3 md:w-full">
            <Shot img={b.phone} kind="phone" sizes="(min-width: 768px) 22vw, 60vw" />
          </figure>
        )}
      </div>
      {b.caption && (
        <Reveal as="p" className="type-meta mt-6 max-w-[60ch] leading-relaxed text-muted" y={12}>
          {b.caption}
        </Reveal>
      )}
      {b.features && (
        <ul className="mt-20 grid border-t border-line sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
          {b.features.map((f, i) => (
            <li key={f.title} className="border-b border-line py-8 sm:pr-8 lg:[&:nth-child(3n+2)]:px-8 lg:[&:nth-child(3n+3)]:pl-8">
              <Reveal y={16}>
                <p className="type-meta mb-4 text-muted">{pad(i + 1)}</p>
                <h3 className="type-display mb-3 text-[clamp(1.6rem,2.3vw,2.3rem)] leading-none">{f.title}</h3>
                <p className="max-w-[38ch] text-[0.95rem] font-[350] leading-relaxed text-muted">{f.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function DecisionsBlock({ b, index }: { b: Extract<CaseBlock, { kind: "decisions" }>; index: number }) {
  return (
    <Section>
      <Meta index={index} label={b.label} aside="Why it works the way it does" />
      <RevealText as="h2" className={bigTitle.replace("mb-14", "mb-10").replace("md:mb-20", "md:mb-14")}>
        {b.title}
      </RevealText>
      <ol className="border-t border-line">
        {b.items.map((d, i) => (
          <li key={d.title} className="group border-b border-line">
            <Reveal className="grid gap-x-6 gap-y-3 py-8 md:grid-cols-12 md:py-10" y={20}>
              <span className="type-meta pt-2 text-muted md:col-span-1">{pad(i + 1)}</span>
              <h3 className="type-display text-[clamp(1.8rem,3.2vw,3.25rem)] leading-[0.95] transition-colors duration-500 group-hover:text-[color:var(--cs-ink)] md:col-span-5">
                {d.title}
              </h3>
              <p className="max-w-[52ch] font-[350] leading-relaxed text-muted md:col-span-5 md:col-start-8">{d.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function BuildBlock({ b, index, name }: { b: Extract<CaseBlock, { kind: "build" }>; index: number; name: string }) {
  return (
    <Section>
      <Meta index={index} label={b.label} aside={name} />
      <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-6">
        <RevealText as="h2" className="type-display text-[clamp(2.5rem,5.4vw,5.75rem)] leading-[0.9] tracking-[-0.02em] md:col-span-5">
          {b.title}
        </RevealText>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal as="p" className="mb-12 text-lead font-[350] text-muted">
            {b.body}
          </Reveal>
          <ul className="mb-12 space-y-8">
            {b.points.map((p) => (
              <li key={p.title}>
                <Reveal y={16}>
                  <p className="mb-2 font-medium">{p.title}</p>
                  <p className="text-[0.95rem] font-[350] leading-relaxed text-muted">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal as="ul" className="flex flex-wrap gap-2" y={12} stagger={0.03}>
            {b.stack.map((s) => (
              <li key={s} className="rounded-full border border-[color:var(--line-strong)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.06em]">
                {s}
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function OutcomesBlock({ b, index }: { b: Extract<CaseBlock, { kind: "outcomes" }>; index: number }) {
  return (
    <Section>
      <Meta index={index} label={b.label} aside={`${b.beforeLabel} → ${b.afterLabel}`} />
      <RevealText as="h2" className={bigTitle}>
        {b.title}
      </RevealText>
      <ul className="border-t border-line">
        <li aria-hidden="true" className="type-meta hidden grid-cols-12 gap-6 border-b border-line py-4 text-muted md:grid">
          <span className="col-span-5">{b.beforeLabel}</span>
          <span className="col-span-6 col-start-7">{b.afterLabel}</span>
        </li>
        {b.rows.map((o) => (
          <li key={o.after} className="border-b border-line">
            <Reveal className="grid gap-x-6 gap-y-2 py-6 md:grid-cols-12 md:items-baseline md:py-8" y={16}>
              <p className="font-[350] text-muted line-through decoration-[color:var(--line-strong)] md:col-span-5">
                <span className="sr-only">{b.beforeLabel}: </span>
                {o.before}
              </p>
              <span aria-hidden="true" className="hidden text-[color:var(--cs-ink)] md:col-span-1 md:block">
                →
              </span>
              <p className="text-[clamp(1.15rem,1.6vw,1.5rem)] leading-snug md:col-span-6">
                <span className="sr-only">{b.afterLabel}: </span>
                {o.after}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ page */

export default function CaseStudyPage({ study: cs }: { study: CaseStudy }) {
  const title = cs.name.toUpperCase();
  const accentFrom = cs.accentFrom ?? title.length;
  const theme = {
    "--cs-ink-d": cs.theme.inkDark,
    "--cs-ink-l": cs.theme.inkLight,
    "--cs-fill": cs.theme.fill,
    "--cs-on-fill": cs.theme.onFill,
    "--cs-glow": cs.theme.glow,
  } as CSSProperties;

  const renderBlock = (b: CaseBlock, i: number) => {
    const index = i + 1;
    const id = i === 0 ? "story" : undefined;
    switch (b.kind) {
      case "text":
        return <TextBlock key={i} b={b} index={index} name={cs.name} id={id} />;
      case "steps":
        return <StepsBlock key={i} b={b} index={index} />;
      case "compare":
        return <CompareBlock key={i} b={b} index={index} />;
      case "screens":
        return <ScreensBlock key={i} b={b} index={index} />;
      case "decisions":
        return <DecisionsBlock key={i} b={b} index={index} />;
      case "build":
        return <BuildBlock key={i} b={b} index={index} name={cs.name} />;
      case "outcomes":
        return <OutcomesBlock key={i} b={b} index={index} />;
    }
  };

  return (
    <PageShell>
      <div className="cs-root" style={theme}>
        {/* ---------------------------------------------------------- Hero */}
        <header className="gutter pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="type-meta mb-10 flex flex-wrap items-center justify-between gap-4 text-muted md:mb-14">
            <a href="/#projects" className="roll-host group inline-flex items-center gap-2 hover:text-fg">
              <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-expo group-hover:-translate-x-1">
                ←
              </span>
              All work
            </a>
            <span>
              (Case study) — {cs.category} · {cs.year}
            </span>
          </div>

          <h1
            aria-label={`${cs.name} — case study`}
            className="type-display mb-10 text-[clamp(4rem,21vw,23rem)] leading-[0.8] tracking-[-0.03em] md:mb-14"
          >
            <span aria-hidden="true" className="mask flex">
              {title.split("").map((char, i) => (
                <span
                  key={i}
                  className={"cs-rise inline-block " + (i >= accentFrom ? "text-[color:var(--cs-ink)]" : "")}
                  style={{ ["--i" as string]: i }}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
          </h1>

          <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-6">
            <p className="type-serif text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.05] md:col-span-5">{cs.tagline}</p>
            <div className="md:col-span-6 md:col-start-7">
              <p className="mb-10 text-lead font-[350] text-muted">{cs.intro}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Magnetic strength={0.2}>
                  <Button href={cs.live.url} {...external} variant="solid" className="px-7">
                    {cs.live.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Button>
                </Magnetic>
                <a href="#story" className="draw-line pb-0.5 text-sm font-medium">
                  Read the case study
                </a>
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 sm:grid-cols-3 md:mt-24 lg:grid-cols-5">
            {cs.facts.map((f) => (
              <div key={f.label}>
                <dt className="type-meta mb-2 text-muted">{f.label}</dt>
                <dd className="text-[0.95rem]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ---------------------------------------------------------- Cover */}
        <div className="gutter relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[10%] -top-10 bottom-10 [background:radial-gradient(60%_50%_at_50%_40%,var(--cs-glow),transparent_70%)]"
          />
          <RevealImage
            src={cs.cover.src}
            srcSet={cs.cover.srcSet}
            sizes="(min-width: 1024px) 94vw, 100vw"
            alt={cs.cover.alt}
            parallax={false}
            className="relative aspect-[16/9] w-full rounded-[1.25rem] border border-line"
          />
        </div>

        {cs.blocks.map(renderBlock)}

        {/* ---------------------------------------------------------- Closing */}
        <section className="gutter pb-28 pt-12 md:pb-40">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface px-6 py-16 md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-[28rem] w-[28rem] [background:radial-gradient(closest-side,var(--cs-glow),transparent)]"
            />
            <p className="type-meta relative mb-8 text-muted">{cs.closing.kicker}</p>
            <RevealText as="h2" className="type-display relative mb-12 max-w-[12ch] text-[clamp(3rem,8vw,8.5rem)] leading-[0.86] tracking-[-0.025em]">
              {cs.closing.title}
            </RevealText>
            <div className="relative flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic strength={0.2}>
                <Button href={cs.live.url} {...external} variant="solid" className="px-8 py-4 text-base">
                  {cs.live.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
              </Magnetic>
              <a href="/#contact" className="draw-line pb-0.5 text-sm font-medium">
                Have a project in mind? Let&rsquo;s talk
              </a>
              <a href="/#projects" className="draw-line pb-0.5 text-sm font-medium text-muted">
                Back to all work
              </a>
            </div>
          </div>
          {cs.disclaimer && <p className="type-meta mt-8 max-w-[80ch] leading-relaxed text-muted">{cs.disclaimer}</p>}
        </section>
      </div>
    </PageShell>
  );
}
