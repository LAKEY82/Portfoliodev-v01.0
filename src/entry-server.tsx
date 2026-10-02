import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";

/**
 * Build-time prerender (see scripts/prerender.mjs): the exact markup the browser renders,
 * delivered as HTML so crawlers and link scrapers that don't run JavaScript still see the
 * headings, text and links. The client then hydrates it (src/main.tsx).
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
