import { useRef, useState, type FormEvent } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { mailtoLink, profile, socials, whatsappLink } from "@/data/portfolio";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full border-0 border-b border-[color:var(--line-strong)] bg-transparent px-0 pb-3 pt-2 text-lg text-fg outline-none transition-colors duration-300 placeholder:text-[color:var(--muted)] placeholder:opacity-70 focus:border-accent focus-visible:outline-none";

/**
 * Final statement + contact. The form still posts to Formspree as a normal HTML form
 * when JavaScript is unavailable; with JS it submits in place and shows the result.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const root = useRef<HTMLElement>(null);

  // Section transition: the paper panel opens from an inset, rounded card to full bleed as it arrives.
  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0% 4% 0% 4% round 2.5rem 2.5rem 0 0)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0rem 0rem 0 0)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={root} id="contact" tabIndex={-1} className="panel-invert gutter pb-16 pt-24 md:pb-20 md:pt-36">
      <Reveal className="type-meta mb-10 flex items-center justify-between border-t border-line pt-4 text-muted md:mb-14">
        <span>(05) — Contact</span>
        <span className="inline-flex items-center gap-2 text-fg">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Freelance contracts open
        </span>
      </Reveal>

      <RevealText as="h2" className="type-display mb-16 text-mega md:mb-24" stagger={0.1}>
        Have an idea?
        {" "}
        <br />
        Let&rsquo;s <span className="type-serif text-accent-ink">build</span> it.
      </RevealText>

      <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-6">
        {/* Direct channels */}
        <Reveal className="space-y-10 md:col-span-5" stagger={0.08}>
          <p className="max-w-[38ch] text-lead font-[350] text-muted">
            Have an idea for a web or mobile application? Feel free to reach out. {profile.responseTime}
          </p>

          <div>
            <p className="type-meta mb-3 text-muted">Email</p>
            <a href={mailtoLink} className="draw-line break-all pb-1 text-[clamp(1.25rem,2.4vw,2rem)] tracking-[-0.02em]">
              {profile.email}
            </a>
          </div>

          <div>
            <p className="type-meta mb-3 text-muted">WhatsApp</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="draw-line pb-1 text-[clamp(1.25rem,2.4vw,2rem)] tracking-[-0.02em]"
            >
              +{profile.whatsappNumber.replace(/^(\d{2})(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4")}
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {socials
              .filter((s) => s.label !== "WhatsApp")
              .map((s) => (
                <li key={s.label}>
                  <AnimatedLink href={s.href} external className="text-muted hover:text-fg">
                    {`${s.label} ↗`}
                  </AnimatedLink>
                </li>
              ))}
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal className="md:col-span-6 md:col-start-7" y={32}>
          <form action={profile.formEndpoint} method="POST" onSubmit={onSubmit} className="space-y-10">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
              <div>
                <label htmlFor="name" className="type-meta block text-muted">
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" placeholder="John Doe" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="type-meta block text-muted">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="john@example.com"
                  className={field}
                />
              </div>
            </div>
            <div>
              <label htmlFor="project" className="type-meta block text-muted">
                Project details
              </label>
              <textarea
                id="project"
                name="project"
                rows={4}
                required
                placeholder="Describe your web or mobile app project (e.g. features, target platforms, timeline)..."
                className={`${field} resize-none`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Magnetic strength={0.2}>
                <Button type="submit" variant="solid" disabled={status === "sending"} className="px-8 py-4 text-base">
                  {status === "sending" ? "Sending…" : "Send proposal"}
                </Button>
              </Magnetic>
              <p role="status" aria-live="polite" className="type-meta text-muted">
                {status === "sent" && <span className="text-accent-ink">Thanks — your message is on its way.</span>}
                {status === "error" && (
                  <span>
                    Something went wrong. Please email{" "}
                    <a href={mailtoLink} className="underline">
                      {profile.email}
                    </a>
                    .
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
