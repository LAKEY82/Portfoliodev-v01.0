import { useCallback, useEffect, useState } from "react";
import { DeferredMotionContext, SiteReadyContext, type MotionPhase } from "@/lib/site-ready";
import { marqueeTech } from "@/data/portfolio";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ColumnGuides } from "@/components/ui/ColumnGuides";
import { Header } from "@/components/navigation/Header";
import { Marquee } from "@/components/motion/Marquee";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const onReveal = useCallback(() => setReady(true), []);
  const [motionPhase, setMotionPhase] = useState<MotionPhase>("off");

  // Set up below-the-fold scroll animations only after the hero intro has started and the
  // main thread is idle. Deep links (#projects …) skip the wait so the target section animates.
  useEffect(() => {
    if (!ready) return;
    const deepLink = location.hash.length > 1;
    // Let the hero intro get going first; each component then enables itself in idle time.
    const timer = window.setTimeout(() => setMotionPhase(deepLink ? "now" : "idle"), deepLink ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [ready]);

  return (
    <SiteReadyContext.Provider value={ready}>
      <DeferredMotionContext.Provider value={motionPhase}>
      <SmoothScroll>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Preloader onReveal={onReveal} />
        <ColumnGuides />
        <ScrollProgress />
        <CustomCursor />
        <Header />

        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Marquee items={marqueeTech} duration={40} className="border-y border-line py-5 md:py-7" />
          <About />
          <Skills />
          <ProjectSection />
          <Experience />
          <Contact />
        </main>

        <Footer />
        <WhatsAppButton />
      </SmoothScroll>
      </DeferredMotionContext.Provider>
    </SiteReadyContext.Provider>
  );
}
