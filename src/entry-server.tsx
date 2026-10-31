import { StrictMode, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";
import CaseStudyPage from "./pages/CaseStudyPage.tsx";
import { caseStudies } from "./data/case-studies.ts";

/**
 * Build-time prerender (see scripts/prerender.mjs): the exact markup each page renders in the
 * browser, delivered as HTML so crawlers and link scrapers that don't run JavaScript still see
 * the headings, text and links. The client then hydrates it (src/client.tsx).
 */
const pages: Record<string, () => ReactNode> = {
  "index.html": () => <App />,
  ...Object.fromEntries(
    Object.values(caseStudies).map((study) => [`work/${study.slug}.html`, () => <CaseStudyPage study={study} />]),
  ),
};

export const pageFiles = Object.keys(pages);

export function render(file: string): string {
  const page = pages[file];
  if (!page) throw new Error(`No prerender entry for ${file}`);
  return renderToString(<StrictMode>{page()}</StrictMode>);
}
