// All case-study content. Each study renders through src/pages/CaseStudyPage.tsx as a list of
// blocks, so wording can change here without touching layout.
//
// Sources: the live products and the original sites (barista.lk, bingchunsrilanka.com), examined
// in Chrome in November 2026. Measured figures say so where they appear. Framings of intent
// ("the brief", "the concept explores…") are the author's and are worth reviewing before publishing.

// ------------------------------------------------------------------ images
import hirelaneCover from "@/assets/Images/web/hirelane.webp";
import hirelaneCoverSmall from "@/assets/Images/web/hirelane-800.webp";
import hirelaneLogin from "@/assets/Images/web/hirelane-login.webp";
import hirelaneLoginMobile from "@/assets/Images/web/hirelane-login-mobile.webp";

import baristaCover from "@/assets/Images/web/barista-showcase.webp";
import baristaCoverSmall from "@/assets/Images/web/barista-showcase-800.webp";
import baristaOldHero from "@/assets/Images/case/barista-old-hero.webp";
import baristaNewHero from "@/assets/Images/case/barista-new-hero.webp";
import baristaOldPage from "@/assets/Images/case/barista-old-page.webp";
import baristaNewPage from "@/assets/Images/case/barista-new-page.webp";
import baristaOldMobile from "@/assets/Images/case/barista-old-mobile.webp";
import baristaNewMobile from "@/assets/Images/case/barista-new-mobile.webp";

import bingCover from "@/assets/Images/web/bing-chun-showcase.webp";
import bingCoverSmall from "@/assets/Images/web/bing-chun-showcase-800.webp";
import bingOldHero from "@/assets/Images/case/bingchun-old-hero.webp";
import bingNewHero from "@/assets/Images/case/bingchun-new-hero.webp";
import bingOldPage from "@/assets/Images/case/bingchun-old-page.webp";
import bingNewPage from "@/assets/Images/case/bingchun-new-page.webp";
import bingOldMobile from "@/assets/Images/case/bingchun-old-mobile.webp";
import bingNewMobile from "@/assets/Images/case/bingchun-new-mobile.webp";

import pdfCover from "@/assets/Images/web/pdf-swami-showcase.webp";
import pdfCoverSmall from "@/assets/Images/web/pdf-swami-showcase-800.webp";
import pdfTools from "@/assets/Images/case/pdfswami-tools.webp";
import pdfMobile from "@/assets/Images/case/pdfswami-mobile.webp";

// ------------------------------------------------------------------ types
export type CaseImage = { src: string; srcSet?: string; alt: string; width: number; height: number };
type Item = { title: string; text: string };

export type CaseBlock =
  | { kind: "text"; label: string; title: string; body: string[]; pull?: string; cards?: Item[]; list?: Item[] }
  | { kind: "steps"; label: string; title: string; aside?: string; steps: (Item & { highlight?: string })[] }
  | {
      kind: "compare";
      label: string;
      title: string;
      intro?: string;
      beforeLabel: string;
      afterLabel: string;
      pairs: { layout: "wide" | "phone" | "page"; before: CaseImage; after: CaseImage; caption: string }[];
      table?: { rows: { label: string; before: string; after: string }[]; note?: string };
    }
  | { kind: "screens"; label: string; title: string; aside?: string; wide: CaseImage; phone?: CaseImage; caption?: string; features?: Item[] }
  | { kind: "decisions"; label: string; title: string; items: Item[] }
  | { kind: "build"; label: string; title: string; body: string; points: Item[]; stack: string[] }
  | { kind: "outcomes"; label: string; title: string; beforeLabel: string; afterLabel: string; rows: { before: string; after: string }[] };

export type CaseStudy = {
  slug: string;
  path: string;
  name: string;
  /** Characters of the uppercase title from this index on are drawn in the accent ink. */
  accentFrom?: number;
  category: string;
  year: string;
  tagline: string;
  intro: string;
  facts: { label: string; value: string }[];
  live: { url: string; label: string };
  cover: CaseImage;
  /**
   * Per-study colour: `ink` for accent text (separate values keep contrast on dark and light
   * themes), `fill` + `onFill` for highlighted markers, `glow` for soft background light.
   */
  theme: { inkDark: string; inkLight: string; fill: string; onFill: string; glow: string };
  blocks: CaseBlock[];
  closing: { kicker: string; title: string };
  disclaimer?: string;
};

const wide = (src: string, alt: string): CaseImage => ({ src, alt, width: 1440, height: 900 });
const phone = (src: string, alt: string): CaseImage => ({ src, alt, width: 600, height: 1298 });

// ================================================================== HireLane
const hirelane: CaseStudy = {
  slug: "hirelane",
  path: "/work/hirelane",
  name: "HireLane",
  accentFrom: 4,
  category: "AI Web Application",
  year: "2026",
  tagline: "Your inbox, sorted into a shortlist.",
  intro:
    "HireLane is an AI recruitment tool for teams that hire from an email inbox. It reads applications where they already arrive, uses AI to pull out each candidate's skills and experience, and turns a cluttered mailbox into a clear shortlist — then closes the loop with kind, personal rejection emails.",
  facts: [
    { label: "Role", value: "Design & development" },
    { label: "Type", value: "AI web application" },
    { label: "Stack", value: "Next.js · React · Tailwind CSS" },
    { label: "Hosting", value: "Netlify" },
    { label: "Year", value: "2026" },
  ],
  live: { url: "https://hirelanehr.netlify.app/login", label: "Open the live app" },
  cover: {
    src: hirelaneCover,
    srcSet: `${hirelaneCoverSmall} 800w, ${hirelaneCover} 1600w`,
    alt: "HireLane on a laptop: the overview dashboard with applicant, to-review, shortlisted and rejected counts, beside the sign-in screen",
    width: 1600,
    height: 900,
  },
  theme: { inkDark: "#c3e41d", inkLight: "#4f5c00", fill: "#6d4aff", onFill: "#ffffff", glow: "rgb(109 74 255 / 0.45)" },
  blocks: [
    {
      kind: "text",
      label: "The problem",
      title: "Hiring lives in an inbox",
      body: [
        "For a small team, a job post usually means a flood of emails. CVs arrive as attachments, mixed in with everything else, and every one has to be opened, read and compared by hand.",
        "The shortlist ends up in someone's head or a spreadsheet, and the candidates who aren't selected often never hear back — not out of rudeness, but because writing dozens of rejection emails is the first task to slip.",
      ],
      pull: "The bottleneck wasn't finding candidates. It was reading, sorting and replying to them.",
      cards: [
        { title: "Manual reading", text: "Every CV opened and compared one by one." },
        { title: "No single view", text: "Who is shortlisted, who is waiting, who was turned down?" },
        { title: "Silent rejections", text: "Candidates left without a reply." },
      ],
    },
    {
      kind: "text",
      label: "The approach",
      title: "Meet recruiters where applications already arrive",
      body: [
        "Instead of asking candidates to apply through yet another portal, HireLane connects to the mailbox that already receives applications.",
        "Signing in is the setup step. Sign in with Google or a Hostinger domain email and that mailbox becomes both the source of applications and the sender of rejection emails. Microsoft sign-in logs you in without changing the inbox, and an admin password is available as a fallback.",
      ],
      list: [
        { title: "Zero migration", text: "No new application form. The inbox the team already uses becomes the pipeline." },
        { title: "AI does the reading", text: "Skills and experience are pulled out of every CV, and candidates are sorted automatically." },
        { title: "People decide, software follows up", text: "The recruiter makes every call. Chores like checking mail and sending replies run on their own." },
      ],
    },
    {
      kind: "steps",
      label: "How it works",
      title: "From inbox to shortlist, on its own",
      aside: "Inbox → shortlist → reply",
      steps: [
        { title: "Inbox", text: "Applications land in Gmail or a company mailbox, exactly as before." },
        { title: "Collect", text: "HireLane checks the inbox every minute and pulls new applications into the campaign." },
        { title: "Understand", text: "AI extracts each candidate's skills and experience from their CV and sorts them.", highlight: "AI" },
        { title: "Decide", text: "The recruiter reviews, shortlists or rejects from one overview." },
        { title: "Reply", text: "Rejections go out every 15 minutes — personal, kind, and from the team's own address." },
      ],
    },
    {
      kind: "screens",
      label: "The product",
      title: "Sign in once, hire from one screen",
      aside: "Live at hirelanehr.netlify.app",
      wide: { src: hirelaneLogin, alt: "HireLane sign-in screen: “Your inbox, sorted into a shortlist” on a violet panel, with Continue with Google and Hostinger email sign-in", width: 1600, height: 1000 },
      phone: { src: hirelaneLoginMobile, alt: "HireLane sign-in screen on a phone", width: 780, height: 1688 },
      caption: "Sign-in doubles as setup: the mailbox you sign in with becomes the application inbox and the sender of rejection emails.",
      features: [
        { title: "Campaigns", text: "Each open role is its own campaign — for example, hiring for “Intern – Software Engineer”." },
        { title: "Overview", text: "Applicants, To review, Shortlisted and Rejected at a glance, with experienced and fresher counts." },
        { title: "Visible automation", text: "One switch — “On: running automatically” — with its schedule written in plain language." },
        { title: "Inbox control", text: "Always shows which mailbox applications are read from and rejections are sent from, and lets you change it." },
        { title: "Quick actions", text: "“Check inbox now” pulls in the last 90 days of applications; “Send pending rejections” emails everyone marked Rejected who hasn't heard back yet." },
        { title: "Kind rejections", text: "Every candidate who isn't selected gets a personal email instead of silence." },
      ],
    },
    {
      kind: "decisions",
      label: "Design decisions",
      title: "Five decisions behind the product",
      items: [
        { title: "Onboarding in one step", text: "Connecting the inbox is folded into sign-in, so a team gets value the moment they log in — there is no separate integration screen to find." },
        { title: "Automation you can see", text: "Software acting on your behalf needs to earn trust. The automation status sits on the overview with its schedule in plain words and a single on/off switch." },
        { title: "Manual overrides", text: "Quick actions run any scheduled step immediately. The schedule is a convenience, never a constraint." },
        { title: "Outcomes, not system states", text: "Copy describes what happened to people — “Waiting for a decision”, “2 emailed” — rather than technical statuses." },
        { title: "Colour only where it means something", text: "A deep violet brand panel and a calm white workspace. Status colours are reserved for the pipeline: amber to review, green shortlisted, red rejected." },
      ],
    },
    {
      kind: "build",
      label: "Engineering",
      title: "Built on the modern Next.js stack",
      body: "HireLane is built with the Next.js App Router on React 19. Forms such as sign-in submit through Server Actions, so there is no separate API layer to maintain for them. The interface is styled with Tailwind CSS using a custom violet brand scale, and the app is deployed on Netlify.",
      points: [
        { title: "Mailbox integration", text: "Google sign-in for Gmail inboxes and credential sign-in for Hostinger domain mailboxes; Microsoft sign-in authenticates without changing the inbox." },
        { title: "Scheduled automation", text: "Inbox checks every minute and batched rejection emails every 15 minutes, with on-demand runs from the dashboard." },
        { title: "AI CV understanding", text: "Each CV is read by AI to extract skills and experience, which drives how candidates are sorted." },
      ],
      stack: ["Next.js", "React 19", "Server Actions", "Tailwind CSS", "Google sign-in", "AI", "Netlify"],
    },
    {
      kind: "outcomes",
      label: "What changes",
      title: "Less inbox, more hiring",
      beforeLabel: "Before",
      afterLabel: "With HireLane",
      rows: [
        { before: "Applications buried in a busy inbox", after: "Every application collected into a campaign automatically" },
        { before: "CVs opened and read one by one", after: "Skills and experience extracted and sorted by AI" },
        { before: "A shortlist in someone's head", after: "One overview: applicants, to review, shortlisted, rejected" },
        { before: "Candidates who never hear back", after: "Personal rejection emails, sent on a schedule" },
      ],
    },
  ],
  closing: { kicker: "See it in action", title: "Try HireLane live" },
};

// ================================================================== Barista
const barista: CaseStudy = {
  slug: "barista",
  path: "/work/barista",
  name: "Barista",
  accentFrom: 0, // the whole name in Barista orange
  category: "Concept Redesign",
  year: "2026",
  tagline: "A menu-first homepage for a café chain with 100 outlets.",
  intro:
    "An independent concept redesign of barista.lk, the website of one of Sri Lanka's best-known café chains. The current site does many jobs at once — franchising, careers, loyalty, news — but a customer deciding what to drink won't find a menu on it. This concept flips the priorities: the drink first, the menu at the centre, and the brand story told in three short beats.",
  facts: [
    { label: "Role", value: "Concept, UI design & Framer build" },
    { label: "Type", value: "Concept redesign" },
    { label: "Built with", value: "Framer (customised template)" },
    { label: "Original", value: "barista.lk — WordPress" },
    { label: "Year", value: "2026" },
  ],
  live: { url: "https://barista-redesign.framer.website/", label: "View the redesign" },
  cover: {
    src: baristaCover,
    srcSet: `${baristaCoverSmall} 800w, ${baristaCover} 1600w`,
    alt: "Barista redesign on a laptop: an orange hero with the Barista wordmark repeated behind an iced caramel drink",
    width: 1600,
    height: 900,
  },
  theme: { inkDark: "#ff7a47", inkLight: "#b93c0e", fill: "#f05a28", onFill: "#1a0a04", glow: "rgb(240 90 40 / 0.35)" },
  blocks: [
    {
      kind: "text",
      label: "The original",
      title: "A homepage serving everyone at once",
      body: [
        "barista.lk is a WordPress site built around the company. Its homepage opens on “The Largest and the Most Preferred Cafe Chain in Sri Lanka”, then moves through the 100-outlet milestone, an ordering-app promotion, a “Know us better” section, the outlet list, franchising, the Crown loyalty programme and the latest news.",
        "Each of those serves someone — franchise partners, job seekers, the press. But the visitor who matters most day to day, a customer choosing a drink, finds no menu on the homepage and nine navigation links to pick from.",
      ],
      pull: "The site explains the company. It never shows the menu.",
      cards: [
        { title: "No menu on the homepage", text: "Drinks only appear in lifestyle photos and the app promotion." },
        { title: "Nine top-level links", text: "Home, Our Story, Franchising, Careers, Sustainability, Gallery, News, Contact — plus Find a Cafe." },
        { title: "Company before appetite", text: "Awards, milestones and the franchise pitch lead; the product follows." },
      ],
    },
    {
      kind: "text",
      label: "The approach",
      title: "Lead with the cup, not the company",
      body: [
        "The concept narrows the homepage to one audience — someone choosing a drink — and answers their questions in the order they ask them: what is this brand, what can I order, what does it cost, and why here?",
        "The corporate content still matters, but it belongs on dedicated pages rather than competing for the first screen.",
      ],
      list: [
        { title: "Appetite first", text: "A single hero drink against the brand orange, with the Barista wordmark as texture behind it." },
        { title: "The menu is the homepage", text: "Coffee, Matcha, Tea & More and Desserts — thirteen items, each with a short description and a price in rupees." },
        { title: "The story in three beats", text: "Work & Relax, Events & Labs and Since 2002: the brand's personality in a few words and images instead of long paragraphs." },
      ],
    },
    {
      kind: "compare",
      label: "Before & after",
      title: "Same brand, different first impression",
      beforeLabel: "Before · barista.lk",
      afterLabel: "After · concept",
      pairs: [
        {
          layout: "wide",
          before: wide(baristaOldHero, "Original barista.lk homepage: an orange hero reading “The Largest and the Most Preferred Cafe Chain in Sri Lanka” beside a photo of customers, under a nine-link navigation bar"),
          after: wide(baristaNewHero, "Redesigned homepage: the Barista wordmark repeated four times behind a caramel iced drink on the brand orange"),
          caption: "The first screen. The original leads with a corporate claim; the concept leads with the product.",
        },
        {
          layout: "page",
          before: { src: baristaOldPage, alt: "The full original homepage, top to bottom: hero, 100-outlet banner, app promotion, about section, outlet list, franchising, loyalty programme, news and footer", width: 640, height: 3047 },
          after: { src: baristaNewPage, alt: "The full redesigned homepage, top to bottom: hero, the four-category menu with prices, and three brand chapters", width: 640, height: 2227 },
          caption: "The whole homepage at the same scale. Nine sections become three, and the menu takes the middle of the page.",
        },
        {
          layout: "phone",
          before: phone(baristaOldMobile, "Original barista.lk homepage on a phone"),
          after: phone(baristaNewMobile, "Redesigned homepage on a phone"),
          caption: "On a phone, the first screen.",
        },
      ],
      table: {
        rows: [
          { label: "Primary audience", before: "Customers, franchisees, job seekers, press", after: "Customers" },
          { label: "Menu on the homepage", before: "None", after: "13 items in 4 categories, with prices" },
          { label: "Navigation", before: "9 links + Find a Cafe", after: "Menu and Reservation" },
          { label: "Built with", before: "WordPress", after: "Framer" },
          { label: "Requests on load", before: "85", after: "34" },
          { label: "Page weight on load", before: "≈ 4.3 MB", after: "≈ 4.3 MB" },
        ],
        note: "Requests and page weight measured in Chrome on a single desktop load of each homepage, November 2026.",
      },
    },
    {
      kind: "decisions",
      label: "Design decisions",
      title: "Five decisions behind the concept",
      items: [
        { title: "Brand orange as the canvas", text: "Barista's orange is its strongest asset, so the whole page sits on it instead of using it only for banners and buttons." },
        { title: "The wordmark as texture", text: "The name repeats behind the hero drink, so the brand reads instantly — even before the logo is noticed." },
        { title: "Big categories, small details", text: "Oversized category names make the menu scannable at a glance; each item keeps one line of description and a price." },
        { title: "Two things to do", text: "Instead of nine links, the page offers two clear actions: read the menu or make a reservation." },
        { title: "Short, image-led chapters", text: "Three photo-led beats replace long corporate paragraphs, so the brand's warmth comes through without a wall of text." },
      ],
    },
    {
      kind: "build",
      label: "The build",
      title: "Built in Framer",
      body: "The concept is built in Framer, starting from a coffee-shop template that was restructured around Barista's menu and restyled with its orange, logo and product photography. Framer handles the responsive layout, the scroll effects and the hosting.",
      points: [
        { title: "Fewer requests", text: "34 requests on load, against 85 for the current homepage. Page weight is similar — the concept uses large, high-quality product photography." },
        { title: "Responsive", text: "The layout adapts from desktop to phone with no horizontal scrolling at 390px." },
      ],
      stack: ["Framer", "Responsive layout", "Brand system", "Menu design"],
    },
    {
      kind: "outcomes",
      label: "What changes",
      title: "From corporate brochure to café menu",
      beforeLabel: "barista.lk",
      afterLabel: "The concept",
      rows: [
        { before: "Nine links and no menu", after: "A menu you can read on the first scroll" },
        { before: "Corporate milestones first", after: "The drink first, the story second" },
        { before: "Orange used as an accent", after: "Orange as the whole canvas" },
        { before: "85 requests on load", after: "34 requests on load" },
      ],
    },
  ],
  closing: { kicker: "See the concept live", title: "Explore the redesign" },
  disclaimer:
    "An independent concept redesign, not commissioned by or affiliated with Barista Coffee Lanka. The Barista name, logo and imagery belong to their owner.",
};

// ================================================================== Bing Chun
const bingChun: CaseStudy = {
  slug: "bing-chun",
  path: "/work/bing-chun",
  name: "Bing Chun",
  accentFrom: 5,
  category: "Concept Redesign",
  year: "2026",
  tagline: "The story behind the cup — before asking for the order.",
  intro:
    "An independent concept redesign of the Bing Chun Sri Lanka homepage. The current site is a capable ordering platform: delivery or takeaway, store selection, a filterable menu, offers and rewards. This concept explores the other half of a homepage's job — making people want the drink before the ordering flow takes over.",
  facts: [
    { label: "Role", value: "Concept, UI design & Framer build" },
    { label: "Type", value: "Concept redesign" },
    { label: "Built with", value: "Framer (customised template)" },
    { label: "Original", value: "bingchunsrilanka.com" },
    { label: "Year", value: "2026" },
  ],
  live: { url: "https://bing-chun-redesign.framer.website/", label: "View the redesign" },
  cover: {
    src: bingCover,
    srcSet: `${bingCoverSmall} 800w, ${bingCover} 1600w`,
    alt: "Bing Chun redesign on a laptop with the headline “Freshly shaken bubble tea & cream”, beside a signature teas menu page",
    width: 1600,
    height: 900,
  },
  theme: { inkDark: "#7aa2ff", inkLight: "#1d4ed8", fill: "#2456e8", onFill: "#ffffff", glow: "rgb(36 86 232 / 0.45)" },
  blocks: [
    {
      kind: "text",
      label: "The original",
      title: "Built to take orders",
      body: [
        "bingchunsrilanka.com is a full ordering web app. Visitors choose delivery or takeaway, pick from the brand's 32+ stores, browse a menu that filters by category and tag, apply offer codes, collect rewards and follow their orders. For a returning customer who knows what they want, it works well.",
        "The homepage, though, behaves like the ordering flow's front door. A “How would you like to order?” dialog opens before the page can be read, fifteen Order Now buttons fill the product strip, and there are only around 200 words to explain what makes a Bing Chun drink different.",
      ],
      pull: "It answers “how do I order?” before “why would I?”",
      cards: [
        { title: "Ordering before browsing", text: "A two-step delivery-or-takeaway dialog greets every first visit." },
        { title: "One message, repeated", text: "Fifteen Order Now buttons on the homepage, and little about the tea itself." },
        { title: "Internal terms on show", text: "Some offer cards explain how a discount's cost is split between branches and the platform." },
      ],
    },
    {
      kind: "text",
      label: "The approach",
      title: "Brand first, ordering second",
      body: [
        "The concept keeps ordering one tap away but gives the homepage a different job: make the case for the drink.",
        "It leads with a single hero cup and the line “Freshly shaken bubble tea & cream”, explains what goes into a Bing Chun drink — freshly steeped tea, chewy pearls, silky cream — then shows the signature teas and answers common questions before ending on the order.",
      ],
      list: [
        { title: "Show the product, then the price", text: "A hero cup and a curated signature menu instead of a carousel of order buttons." },
        { title: "Explain the craft", text: "A section on what makes the drink different: the tea base, the pearls and the cream." },
        { title: "Answer questions up front", text: "An FAQ covers delivery and takeaway, ingredients, non-tea options and whether it's a good place to relax." },
      ],
    },
    {
      kind: "compare",
      label: "Before & after",
      title: "A different first visit",
      beforeLabel: "Before · bingchunsrilanka.com",
      afterLabel: "After · concept",
      pairs: [
        {
          layout: "wide",
          before: wide(bingOldHero, "Original Bing Chun homepage on a first visit: a “How would you like to order? Step 1 of 2” dialog with Delivery and Takeaway options covers the hero"),
          after: wide(bingNewHero, "Redesigned homepage: the headline “Freshly shaken bubble tea & cream” above a bubble tea cup in a splash of milk tea"),
          caption: "The first screen on a first visit. The original opens an order dialog; the concept opens on the product.",
        },
        {
          layout: "page",
          before: { src: bingOldPage, alt: "The full original homepage as a visitor scrolls it: hero, an intro line, a favourites carousel with Order Now buttons, offer cards with promo codes and the footer", width: 640, height: 2029 },
          after: { src: bingNewPage, alt: "The full redesigned homepage: hero, about statement, signature teas menu, a section on the craft, a mascot-led brand section, an FAQ and a closing order call to action", width: 640, height: 4279 },
          caption: "The whole homepage at the same scale. The concept is longer because it tells the brand story the original leaves out.",
        },
        {
          layout: "phone",
          before: phone(bingOldMobile, "Original Bing Chun homepage on a phone, with the order-type dialog filling the screen"),
          after: phone(bingNewMobile, "Redesigned homepage on a phone"),
          caption: "On a phone, the first screen of a first visit.",
        },
      ],
      table: {
        rows: [
          { label: "First thing a visitor sees", before: "Order-type dialog", after: "Hero product and tagline" },
          { label: "Requests on load", before: "187", after: "53" },
          { label: "Image weight", before: "3.2 MB", after: "0.3 MB" },
          { label: "Total transfer", before: "6.2 MB", after: "4.6 MB" },
          { label: "Images missing alt text", before: "43 of 68", after: "1 of 14" },
        ],
        note: "Measured in Chrome on a single desktop load of each homepage, November 2026. The original includes a full ordering system that the concept doesn't, so these figures compare homepages, not equivalent products.",
      },
    },
    {
      kind: "decisions",
      label: "Design decisions",
      title: "Five decisions behind the concept",
      items: [
        { title: "Keep the blue and the mascot", text: "Bing Chun's blue and its mascot are already recognisable, so the concept keeps both rather than reinventing the identity." },
        { title: "One hero, one line", text: "A single splashing cup and a short promise replace the dialog and the carousel on the first screen." },
        { title: "A menu you can scan", text: "Signature teas sit under Signature Brews, Cold Brew and Frappuccino tabs; each card shows a rating, a price and one action." },
        { title: "Condensed, energetic type", text: "Tall, condensed headlines give the page the same energy as the product — loud, sweet and playful." },
        { title: "Ordering as the destination", text: "The page ends on “Make your boba moment special” and an Order Now call to action, where the existing ordering system would take over." },
      ],
    },
    {
      kind: "build",
      label: "The build",
      title: "Built in Framer",
      body: "The concept is built in Framer from a café template, restructured around bubble tea and restyled with Bing Chun's blue, mascot and product photography. Framer provides the responsive layout, the scroll effects and the hosting.",
      points: [
        { title: "A much lighter homepage", text: "53 requests and 0.3 MB of images on load, against 187 requests and 3.2 MB of images for the current homepage." },
        { title: "Described images", text: "13 of the 14 images carry alt text, against 25 of 68 on the original." },
        { title: "Responsive", text: "The layout adapts from desktop to phone with no horizontal scrolling at 390px." },
      ],
      stack: ["Framer", "Responsive layout", "Brand storytelling", "Menu design"],
    },
    {
      kind: "outcomes",
      label: "What changes",
      title: "From order form to brand story",
      beforeLabel: "Current homepage",
      afterLabel: "The concept",
      rows: [
        { before: "A dialog before the page", after: "The product before the process" },
        { before: "Fifteen Order Now buttons", after: "One clear Order Now at the end of the story" },
        { before: "Around 200 words about the brand", after: "A page that explains what's in the cup" },
        { before: "187 requests and 3.2 MB of images", after: "53 requests and 0.3 MB of images" },
      ],
    },
  ],
  closing: { kicker: "See the concept live", title: "Explore the redesign" },
  disclaimer:
    "An independent concept redesign, not commissioned by or affiliated with Bing Chun Sri Lanka. The Bing Chun name, mascot, logo and imagery belong to their owner.",
};

// ================================================================== PDF-Swami
const pdfSwami: CaseStudy = {
  slug: "pdf-swami",
  path: "/work/pdf-swami",
  name: "PDF-Swami",
  accentFrom: 4,
  category: "Web Application",
  year: "2026",
  tagline: "Free forever & private — the PDF tools people actually need.",
  intro:
    "PDF-Swami is a free web app that brings the everyday PDF jobs — merge, split, compress, convert, reorganise and edit — into one clean toolbox, with no account to create first. Two newer tools, an AI edit detector and in-place text editing, are in beta.",
  facts: [
    { label: "Role", value: "Design & development" },
    { label: "Type", value: "Web application" },
    { label: "Stack", value: "React · pdf-lib · PDF.js" },
    { label: "Hosting", value: "Vercel" },
    { label: "Year", value: "2026" },
  ],
  live: { url: "https://pdfswami.vercel.app/", label: "Open PDF-Swami" },
  cover: {
    src: pdfCover,
    srcSet: `${pdfCoverSmall} 800w, ${pdfCover} 1600w`,
    alt: "PDF-Swami on a laptop with the headline “Free Forever & Private”, beside a PDF being converted to Word and text",
    width: 1600,
    height: 900,
  },
  theme: { inkDark: "#b8f23c", inkLight: "#3f6212", fill: "#7c3aed", onFill: "#ffffff", glow: "rgb(124 58 237 / 0.4)" },
  blocks: [
    {
      kind: "text",
      label: "The problem",
      title: "Simple PDF jobs, complicated tools",
      body: [
        "Merging two files or shrinking a scan shouldn't need a subscription. Yet the usual options are expensive desktop software, or free websites that wrap a one-minute task in sign-ups, upsells and adverts — and a different site for every job.",
        "PDF-Swami starts from a simple brief: the handful of PDF tasks people do every week, free, in one place, with nothing standing between the visitor and the tool.",
      ],
      pull: "One minute of work shouldn't come with a paywall.",
      cards: [
        { title: "Paywalls", text: "Basic tasks locked behind subscriptions." },
        { title: "Clutter", text: "Sign-ups, upsells and ads around every action." },
        { title: "Scattered tools", text: "A different website for every job." },
      ],
    },
    {
      kind: "steps",
      label: "How it works",
      title: "Pick a tool, add a file, download",
      aside: "No account needed",
      steps: [
        { title: "Start", text: "One line — “Free Forever & Private” — and one button: Start For Free." },
        { title: "Choose", text: "Pick one of eight focused tools from a single grid." },
        { title: "Add", text: "Drop in the PDF or images to work on." },
        { title: "Process", text: "PDF-Swami merges, splits, compresses, converts or edits the document.", highlight: "PDF" },
        { title: "Download", text: "Get the finished file back straight away." },
      ],
    },
    {
      kind: "screens",
      label: "The product",
      title: "One grid, eight tools",
      aside: "Live at pdfswami.vercel.app",
      wide: wide(pdfTools, "PDF-Swami's tool picker: eight cards — Merge, Split, Compress, Convert Images to PDF, Organize Pages, PDF to Word, AI Edit Detector (beta) and Edit PDF Text (beta)"),
      phone: phone(pdfMobile, "PDF-Swami's landing page on a phone: “Free Forever & Private” with a Start For Free button"),
      caption: "Every tool explains its job in one sentence, and experimental tools are labelled BETA.",
      features: [
        { title: "Merge PDF", text: "Combine multiple PDF files into one document, in your preferred order." },
        { title: "Split PDF", text: "Extract specific page ranges or separate every page into its own file." },
        { title: "Compress PDF", text: "Reduce file size while preserving document quality." },
        { title: "Images ↔ PDF", text: "Turn JPG and PNG images into a PDF, or extract images from one." },
        { title: "Organize Pages", text: "Sort, add or rearrange the pages within a PDF." },
        { title: "PDF to Word", text: "Convert a PDF's content and layout into an editable DOCX file." },
        { title: "AI Edit Detector · Beta", text: "Identify and highlight potential edits or inconsistencies in a PDF." },
        { title: "Edit PDF Text · Beta", text: "Click on text in a PDF to detect its font and rewrite it in place." },
      ],
    },
    {
      kind: "decisions",
      label: "Design decisions",
      title: "Five decisions behind the product",
      items: [
        { title: "A promise, then a button", text: "The landing page is a single line and a single action. There is nothing to read before starting." },
        { title: "One sentence per tool", text: "Each card says what the tool does in plain words, so choosing never needs a manual." },
        { title: "Colour-coded tools", text: "Every tool has its own icon colour, which makes the grid quick to scan and easy to remember." },
        { title: "Honest labelling", text: "Experimental features are marked BETA rather than hidden or oversold." },
        { title: "No account", text: "There is nothing to sign up for before using a tool." },
      ],
    },
    {
      kind: "build",
      label: "Engineering",
      title: "Built on proven PDF libraries",
      body: "PDF-Swami is a React single-page app deployed on Vercel. Its bundle ships the libraries that do the heavy lifting in the browser: pdf-lib for creating and modifying PDFs, PDF.js with its worker for reading and rendering pages, docx for Word export and JSZip for packaging several files into one download.",
      points: [
        { title: "PDF engine", text: "pdf-lib and PDF.js handle merging, splitting, page organisation and rendering." },
        { title: "Word export", text: "The docx library builds editable DOCX files from PDF content." },
        { title: "Multi-file downloads", text: "JSZip bundles several output files into a single download." },
      ],
      stack: ["React", "pdf-lib", "PDF.js", "docx", "JSZip", "Vercel"],
    },
  ],
  closing: { kicker: "Try it yourself", title: "Open PDF-Swami" },
};

export const caseStudies: Record<string, CaseStudy> = {
  hirelane,
  barista,
  "bing-chun": bingChun,
  "pdf-swami": pdfSwami,
};
