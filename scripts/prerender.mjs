// Injects the server-rendered markup into each built page (dist/index.html, dist/work/*.html)
// after `vite build`. Runs as part of `npm run build`; pages are listed in src/entry-server.tsx.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const mountPoint = '<div id="root"></div>';

const { render, pageFiles } = await import(pathToFileURL(ssrEntry).href);

// Preload the render-critical fonts so they are fetched in parallel with the CSS, not after it.
// Display face (hero names, preloader) + serif italic (hero taglines — the mobile LCP element).
const assets = fs.readdirSync(path.join(dist, "assets"));
const criticalFonts = ["archivo-latin-wdth-normal-", "instrument-serif-latin-400-italic-"].map((prefix) => {
  const file = assets.find((f) => f.startsWith(prefix) && f.endsWith(".woff2"));
  if (!file) throw new Error(`Critical font ${prefix}*.woff2 not found in dist/assets`);
  return file;
});
const preload = criticalFonts
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
  .join("\n    ");

for (const file of pageFiles) {
  const htmlFile = path.join(dist, file);
  const appHtml = render(file);
  if (!appHtml || appHtml.length < 1000) throw new Error(`Prerender of ${file} produced suspiciously little HTML (${appHtml.length} chars)`);

  const template = fs.readFileSync(htmlFile, "utf8");
  if (!template.includes(mountPoint)) throw new Error(`Mount point ${mountPoint} not found in dist/${file}`);

  const html = template
    .replace("</title>", `</title>\n    ${preload}`)
    .replace(mountPoint, `<div id="root">${appHtml}</div>`);
  fs.writeFileSync(htmlFile, html);
  console.log(`prerendered dist/${file} (${(appHtml.length / 1024).toFixed(1)} kB of app markup)`);
}

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
