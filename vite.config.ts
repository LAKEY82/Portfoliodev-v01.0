import path from "path"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSitemapXml } from "./src/seo/sitemap"
import { buildRobotsTxt } from "./src/seo/robots"

/**
 * Generates /sitemap.xml and /robots.txt from src/seo/* — served in dev, emitted into the
 * production build. (Vite equivalent of Next.js `app/sitemap.ts` + `app/robots.ts`.)
 */
function seoFiles(): Plugin {
  const files = [
    { fileName: "sitemap.xml", type: "application/xml; charset=utf-8", build: buildSitemapXml },
    { fileName: "robots.txt", type: "text/plain; charset=utf-8", build: buildRobotsTxt },
  ]
  return {
    name: "seo-files",
    configureServer(server) {
      for (const file of files) {
        server.middlewares.use(`/${file.fileName}`, (_req, res) => {
          res.setHeader("Content-Type", file.type)
          res.end(file.build())
        })
      }
    },
    generateBundle() {
      for (const file of files) {
        this.emitFile({ type: "asset", fileName: file.fileName, source: file.build() })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
  // Bundle these into the SSR prerender build: gsap and lenis ship ESM without "type": "module",
  // which Node can't import directly.
  ssr: {
    noExternal: ["gsap", "@gsap/react", "lenis"],
  },
  build: {
    rollupOptions: {
      // One HTML entry per page; each is prerendered by scripts/prerender.mjs.
      input: {
        main: path.resolve(__dirname, "index.html"),
        hirelane: path.resolve(__dirname, "work/hirelane.html"),
        barista: path.resolve(__dirname, "work/barista.html"),
        bingChun: path.resolve(__dirname, "work/bing-chun.html"),
        pdfSwami: path.resolve(__dirname, "work/pdf-swami.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
