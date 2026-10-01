// Single source of truth for all portfolio content.
// Edit text, links and projects here — components only render this data.

import barista from "@/assets/Images/web/barista.webp";
import bingChun from "@/assets/Images/web/bing-chun.webp";
import pdfSwami from "@/assets/Images/web/pdf-swami.webp";
import lifeLk from "@/assets/Images/web/lifelk.webp";
import cafe from "@/assets/Images/web/cafe.webp";
import restaurant from "@/assets/Images/web/restaurant.webp";
import hotzy from "@/assets/Images/web/hotzy.webp";
import damro from "@/assets/Images/web/damro.webp";
import wisepath from "@/assets/Images/web/wisepath.webp";
import wisepathMobile from "@/assets/Images/web/wisepath-mobile.webp";
import portrait from "@/assets/Images/web/portrait.webp";

export const profile = {
  firstName: "Lakindu",
  lastName: "Perera",
  handle: "LAK3Y",
  role: "Freelance Web & Mobile App Developer",
  tagline: "A passionate Software Engineer with a keen eye for designing innovation.",
  location: "Sri Lanka",
  timeZone: "Asia/Colombo",
  portrait,
  email: "verdentperera@gmail.com",
  whatsappNumber: "94772648062",
  formEndpoint: "https://formspree.io/f/xeewqbrw",
  responseTime: "I typically respond to freelance inquiries within 24 hours.",
};

export const whatsappLink = `https://wa.me/${profile.whatsappNumber}`;
export const mailtoLink = `mailto:${profile.email}`;

export const socials = [
  { label: "GitHub", href: "https://github.com/LAKEY82" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lakindu-perera-2988b91b5/" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01aaf9522a8cf4374a?mp_source=share" },
  { label: "WhatsApp", href: whatsappLink },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  statement:
    "I design and build highly interactive, responsive web interfaces and iOS & Android applications.",
  paragraphs: [
    "As a freelance developer, I partner directly with founders and technical leaders to turn specifications into production-ready software.",
    "My stack is focused on modern JS/TS frameworks, using React and Next.js on the web, and React Native for unified cross-platform mobile apps. I prioritize high performance, minimal load times, and fluid micro-animations that keep users engaged.",
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years coding" },
    { value: 25, suffix: "+", label: "Projects shipped" },
    { value: 100, suffix: "%", label: "Satisfaction" },
  ],
};

export const skillCategories = [
  {
    title: "Web Apps",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
  },
  {
    title: "Mobile Apps",
    skills: ["React Native", "Expo", "Android SDK", "App Store Deploy", "Push Notifications"],
  },
  {
    title: "Backend & DB",
    skills: ["Node.js", "Express", "Supabase", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    title: "Tools & Infra",
    skills: ["Git / GitHub", "Docker", "Figma", "Vercel / AWS", "Firebase", "Agile / Scrum"],
  },
];

/** Words used by the moving-typography marquee. */
export const marqueeTech = ["React", "Next.js", "React Native", "TypeScript", "Node.js", "Supabase", "Framer"];

export type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  /** Omit when the project has no public link. */
  link?: string;
  /** Text for the link and custom cursor. */
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    title: "Barista Website Redesign",
    category: "Web Application",
    description: "A website redesign for the Sri Lankan brand Barista website developed using Framer.",
    image: barista,
    tags: ["Framer"],
    link: "https://barista-redesign.framer.website/",
  },
  {
    title: "Bing Chun Website Redesign",
    category: "Web Application",
    description: "A website developed using Framer as a redesign for the current website of the brand Bing Chun.",
    image: bingChun,
    tags: ["Framer"],
    link: "https://bing-chun-redesign.framer.website/",
  },
  {
    title: "PDF-Swami",
    category: "Web Application",
    description:
      "A modern PDF editor with a sleek interface, built using React, TypeScript, and Tailwind CSS. It offers features like text editing, annotations, and form filling, all powered by a custom PDF rendering engine for smooth performance.",
    image: pdfSwami,
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://pdfswami.vercel.app/",
  },
  {
    title: "LifeLk",
    category: "Web Application",
    description:
      "A modern web dashboard built for Sri Lankans to access daily essential information in one place. View weather, fuel updates, exchange rates, holidays, news, and other useful live data through public APIs.",
    image: lifeLk,
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://life-lk.vercel.app/",
  },
  {
    title: "Caffe Website",
    category: "Web Application",
    description:
      "A real-time website for a local cafe, featuring dynamic menu updates, online ordering, and a custom CMS. Built with React, Tailwind CSS, and Vite for lightning-fast performance.",
    image: cafe,
    tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Vite"],
  },
  {
    title: "Restaurant Website",
    category: "Web Application",
    description:
      "A responsive website for a local restaurant, featuring a modern design, online reservation system, and integrated social media feeds. Built with React, Tailwind CSS, and Vite.",
    image: restaurant,
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Netlify"],
  },
  {
    title: "Hotzy Sauce Redesign",
    category: "Web Application",
    description: "A fan made, SEO-optimized headless product website for the local hot sauce brand.",
    image: hotzy,
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Damro Furniture Redesign",
    category: "Web Application",
    description:
      "A modern, responsive website for a furniture retailer, featuring product showcases, online quoting, and seamless integration with their inventory management system. Built with React, Tailwind CSS, and Vite.",
    image: damro,
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    title: "Wisepath Web Application",
    category: "Web Application",
    description:
      "A web application for an online learning platform, featuring interactive courses, progress tracking, and a modern UI. Built with React, TypeScript, and Tailwind CSS.",
    image: wisepath,
    tags: ["React", "TypeScript", "Tailwind CSS", "C# .Net"],
    link: "https://wisepath.lk",
  },
  {
    title: "Wisepath Mobile Application",
    category: "Mobile Application",
    description: "The mobile application for Wisepath institute.",
    image: wisepathMobile,
    tags: ["React", "TypeScript", "Tailwind CSS", "C# .Net"],
    link: "https://wisepath.lk/wp-content/uploads/2025/12/wisepath_android.apk",
    linkLabel: "Download APK",
  },
];

export type Job = {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
};

// Employment history — mirrors the CV (most recent first).
export const experience: Job[] = [
  {
    period: "Mar 2026 — Aug 2026",
    role: "Software Engineer / Android Developer",
    company: "KAL",
    location: "Colombo, Sri Lanka",
    description:
      "Developed frontend applications for Android Smart POS devices and payment solutions, working across user interfaces, transaction workflows, device integrations, and production debugging.",
  },
  {
    period: "Nov 2024 — Mar 2026",
    role: "Associate Software Engineer",
    company: "Xenosys Software Solutions",
    location: "Colombo, Sri Lanka",
    description:
      "Worked across web and mobile application development, with a primary focus on React Native, TypeScript, .NET, SQL, and frontend-backend integration.",
  },
  {
    period: "Aug 2024 — Nov 2024",
    role: "Associate React Native Developer",
    company: "Agro World",
    location: "Colombo, Sri Lanka",
    description:
      "Designed and developed mobile applications to enhance farmers' agricultural productivity, collaborating with cross-functional teams to implement user-friendly interfaces and integrate advanced features.",
  },
  {
    period: "Feb 2023 — Aug 2023",
    role: "Software Quality Assurance Intern",
    company: "AFFINITI Innovations",
    location: "Colombo, Sri Lanka",
    description:
      "Supported the QA team with manual testing and test case writing for the CRM project developed by Affiniti Innovations.",
  },
];
