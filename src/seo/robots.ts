// robots.txt source of truth (the Vite equivalent of a Next.js `app/robots.ts`).
// The build turns this into /robots.txt — see the `seoFiles` plugin in vite.config.ts.
//
// Only add `disallow` paths for routes that really exist and are private or internal.
// robots.txt controls crawling, not indexing: a page that must stay out of search results
// needs `<meta name="robots" content="noindex">` and must remain crawlable so it is seen.

import { SITE_URL } from "./sitemap";

export type RobotsRule = {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
};

export const robotsRules: RobotsRule[] = [
  // The whole site is public: the page, its JS/CSS/image assets and the sitemap.
  // There are no private, API, admin or auth routes to exclude.
  { userAgent: "*", allow: ["/"] },
];

export function buildRobotsTxt(rules: RobotsRule[] = robotsRules): string {
  const groups = rules.map(({ userAgent, allow = [], disallow = [] }) =>
    [`User-agent: ${userAgent}`, ...allow.map((p) => `Allow: ${p}`), ...disallow.map((p) => `Disallow: ${p}`)].join("\n"),
  );
  return [...groups, `Sitemap: ${new URL("/sitemap.xml", SITE_URL).href}`, ""].join("\n\n").replace(/\n\n$/, "\n");
}
