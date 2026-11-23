import { useEffect, useState, type ReactNode } from "react";
import { DeferredMotionContext, SiteReadyContext, type MotionPhase } from "@/lib/site-ready";
import { PageContext } from "@/lib/page";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ColumnGuides } from "@/components/ui/ColumnGuides";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/sections/Footer";

const home = { home: false };

/**
 * Shared chrome for pages other than the home page (case studies): same header, footer,
 * cursor, smooth scroll and column guides, but no preloader. Scroll animations are set up
 * in idle time right after the first paint.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const [motionPhase, setMotionPhase] = useState<MotionPhase>("off");

  useEffect(() => {
    const timer = window.setTimeout(() => setMotionPhase(location.hash.length > 1 ? "now" : "idle"), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <PageContext.Provider value={home}>
      <SiteReadyContext.Provider value={true}>
        <DeferredMotionContext.Provider value={motionPhase}>
          <SmoothScroll>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
            >
              Skip to content
            </a>
            <ColumnGuides />
            <ScrollProgress />
            <CustomCursor />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </DeferredMotionContext.Provider>
      </SiteReadyContext.Provider>
    </PageContext.Provider>
  );
}
