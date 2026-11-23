import { StrictMode, type ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Self-hosted fonts (latin subsets the site uses). Archivo carries the width axis (62–125%)
// that the condensed display type depends on; its file is preloaded by scripts/prerender.mjs.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import './index.css'

/** Client entry shared by every page: hydrates prerendered HTML, or renders from scratch in dev. */
export function mount(page: ReactNode) {
  // Reveal the hero name once fonts are ready (see .fonts-pending in index.css). The timeout
  // guarantees it can never stay hidden if a font request fails.
  const showFonts = () => document.documentElement.classList.remove('fonts-pending')
  document.fonts.ready.then(showFonts)
  window.setTimeout(showFonts, 3000)

  const container = document.getElementById('root')!
  const app = <StrictMode>{page}</StrictMode>

  // Production HTML is prerendered (scripts/prerender.mjs), so attach to the existing markup.
  // The dev server serves an empty #root, so render from scratch there.
  if (container.hasChildNodes()) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
  }
}
