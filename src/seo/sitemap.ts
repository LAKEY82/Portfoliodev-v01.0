// Sitemap source of truth (the Vite equivalent of a Next.js `app/sitemap.ts`).
// The build turns this list into /sitemap.xml — see the `seoFiles` plugin in vite.config.ts.
//
// Rules for adding entries:
// - Only real, public, indexable pages that return 200 at their canonical URL.
// - No redirects, 404s, noindex pages, in-page anchors (#about …) or external URLs.
// - Set `lastModified` only when the content's real modification date is known.
//   Search engines ignore priority/changefreq, so they are deliberately not supported.

/** Canonical production origin (HTTPS + www), confirmed from the live Vercel redirects. */
export const SITE_URL = "https://www.lakinduperera.pro";

export type SitemapEntry = {
  /** Path relative to the site root, starting with "/". */
  path: string;
  /** ISO date (YYYY-MM-DD) of the last real content change, if known. */
  lastModified?: string;
};

export const sitemapEntries: SitemapEntry[] = [
  // The portfolio is a single page; its sections are anchors on this URL, not separate routes.
  { path: "/" },
];

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export function buildSitemapXml(entries: SitemapEntry[] = sitemapEntries): string {
  const urls = entries.map(({ path, lastModified }) => {
    if (!path.startsWith("/")) throw new Error(`Sitemap path must start with "/": ${path}`);
    const loc = new URL(path, SITE_URL).href;
    const lastmod = lastModified ? `\n    <lastmod>${escapeXml(lastModified)}</lastmod>` : "";
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n  </url>`;
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}
