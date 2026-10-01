import { useCallback, useState } from "react";
import { SiteReadyContext } from "@/lib/site-ready";
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

  return (
    <SiteReadyContext.Provider value={ready}>
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
    </SiteReadyContext.Provider>
  );
}
