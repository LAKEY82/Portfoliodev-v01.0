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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
