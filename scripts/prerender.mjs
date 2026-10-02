// Injects the server-rendered app into dist/index.html after `vite build`.
// Runs as part of `npm run build`; see src/entry-server.tsx.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const htmlFile = path.join(root, "dist", "index.html");
const mountPoint = '<div id="root"></div>';

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();
if (!appHtml || appHtml.length < 1000) throw new Error(`Prerender produced suspiciously little HTML (${appHtml.length} chars)`);

const template = fs.readFileSync(htmlFile, "utf8");
if (!template.includes(mountPoint)) throw new Error(`Mount point ${mountPoint} not found in dist/index.html`);

fs.writeFileSync(htmlFile, template.replace(mountPoint, `<div id="root">${appHtml}</div>`));
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of app markup)`);
