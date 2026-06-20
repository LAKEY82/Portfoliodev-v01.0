import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { Menu, X, ChevronDown, Monitor, Smartphone, Database, PenTool, ArrowUpRight, MessageSquare, Briefcase } from "lucide-react";

// Simple CountUp component for animating numbers on scroll
const CountUp: React.FC<{ target: number; duration?: number; suffix?: string }> = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const startTimeRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * target));
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(target); // ensure final value
      }
    };
    requestAnimationFrame(step);
    return () => {
      startTimeRef.current = null;
    };
  }, [target, duration]);

  return <>{count}{suffix}</>;
};
import profileImage from "@/assets/IMG_0269.jpg";
import caffe from "../../assets/Images/cafe1.png";
import restaurent from "../../assets/Images/restaurent.png";
import hotzy from "../../assets/Images/hotzy.png";
import damro from "../../assets/Images/damro.png";
import wisepath from "../../assets/Images/wisepath.png";
import wisepathmobile from "../../assets/Images/wpmobile.png";
import pdf from "../../assets/Images/Mockup Page (2).png"
import life from "../../assets/Images/Mockup Page.png";
// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  // Split text into segments
  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "restart none none reverse",
        },
      });
      tl.fromTo(
        ref.current!.children,
        {
          opacity: 0,
          y: direction === "top" ? -20 : 20,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          stagger: delay / 1000,
          duration: 0.5,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, direction, segments]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

// Premium ScrollReveal animation component driven by IntersectionObserver
interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-in" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-up";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 800,
  threshold = 0.05, // kept for API compatibility
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const init: any = {};
    const anim: any = { duration: duration / 1000, ease: "power2.out", delay: delay / 1000 };

    switch (variant) {
      case "fade-in":
        init.opacity = 0;
        init.filter = "blur(8px)";
        anim.opacity = 1;
        anim.filter = "blur(0px)";
        break;
      case "slide-up":
        init.opacity = 0;
        init.y = 50;
        anim.opacity = 1;
        anim.y = 0;
        break;
      case "slide-down":
        init.opacity = 0;
        init.y = -50;
        anim.opacity = 1;
        anim.y = 0;
        break;
      case "slide-left":
        init.opacity = 0;
        init.x = 50;
        anim.opacity = 1;
        anim.x = 0;
        break;
      case "slide-right":
        init.opacity = 0;
        init.x = -50;
        anim.opacity = 1;
        anim.x = 0;
        break;
      case "scale-up":
        init.opacity = 0;
        init.scale = 0.93;
        anim.opacity = 1;
        anim.scale = 1;
        break;
      default:
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        init,
        {
          ...anim,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [variant, delay, duration, threshold]);

  // Apply initial styles to avoid flash of unstyled content
  const initialStyle: any = {};
  switch (variant) {
    case "fade-in":
      initialStyle.opacity = 0;
      initialStyle.filter = "blur(8px)";
      break;
    case "slide-up":
      initialStyle.opacity = 0;
      initialStyle.transform = "translateY(50px)";
      break;
    case "slide-down":
      initialStyle.opacity = 0;
      initialStyle.transform = "translateY(-50px)";
      break;
    case "slide-left":
      initialStyle.opacity = 0;
      initialStyle.transform = "translateX(50px)";
      break;
    case "slide-right":
      initialStyle.opacity = 0;
      initialStyle.transform = "translateX(-50px)";
      break;
    case "scale-up":
      initialStyle.opacity = 0;
      initialStyle.transform = "scale(0.93)";
      break;
    default:
      break;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={initialStyle}
    >
      {children}
    </div>
  );
};

export default function Component() {
  // WhatsApp floating button (fixed)
  const whatsappNumber = "94772648062";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  // Email floating button (fixed)
  // const email = "verdentperera@gmail.com";
  // const mailtoLink = `mailto:${email}`;

  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { label: "HOME", href: "#home", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  const skillCategories = [
    {
      title: "Web Apps",
      icon: <Monitor className="w-5 h-5 text-[#C3E41D]" />,
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"]
    },
    {
      title: "Mobile Apps",
      icon: <Smartphone className="w-5 h-5 text-[#C3E41D]" />,
      skills: ["React Native", "Expo", "Android SDK", "App Store Deploy", "Push Notifications"]
    },
    {
      title: "Backend & DB",
      icon: <Database className="w-5 h-5 text-[#C3E41D]" />,
      skills: ["Node.js", "Express", "Supabase", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      title: "Tools & Infra",
      icon: <PenTool className="w-5 h-5 text-[#C3E41D]" />,
      skills: ["Git / GitHub", "Docker", "Figma", "Vercel / AWS", "Firebase", "Agile / Scrum"]
    }
  ];

  const projects = [
         {
      title: "PDF-Swami",
      category: "Web Application",
      description: "A modern PDF editor with a sleek interface, built using React, TypeScript, and Tailwind CSS. It offers features like text editing, annotations, and form filling, all powered by a custom PDF rendering engine for smooth performance.",
      image: pdf,
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      link: "https://pdfswami.vercel.app/"
    },
     {
      title: "LifeLk",
      category: "Web Application",
      description: "A modern web dashboard built for Sri Lankans to access daily essential information in one place. View weather, fuel updates, exchange rates, holidays, news, and other useful live data through public APIs.",
      image: life,
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      link: "https://life-lk.vercel.app/"
    },
    {
      title: "Caffe Website",
      category: "Web Application",
      description: "A real-time website for a local cafe, featuring dynamic menu updates, online ordering, and a custom CMS. Built with React, Tailwind CSS, and Vite for lightning-fast performance.",
     image: caffe,
      tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Vite"],
      link: "#"
    },
    {
      title: "Restaurent Website",
      category: "Web Application",
      description: "A responsive website for a local restaurant, featuring a modern design, online reservation system, and integrated social media feeds. Built with React, Tailwind CSS, and Vite.",
      image: restaurent,
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Netlify"],
      link: "#"
    },
    {
      title: "A website redesign for Hotzy sauce",
      category: "Web Application",
      description: "A fan made, SEO-optimized headless product website for the Local hot sauce brand.",
      image: hotzy,
      tags: ["Next.js", "Tailwind CSS", "Vercel"],
      link: "#"
    },
    {
      title: "Website redesign for Damro Furniture",
      category: "Web Application",
      description: "A modern, responsive website for a furniture retailer, featuring product showcases, online quoting, and seamless integration with their inventory management system. Built with React, Tailwind CSS, and Vite.",
      image: damro,
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      link: "#"
    },
    {
      title: "Wisepath Web application",
      category: "Web Application",
      description: "A web application for an online learning platform, featuring interactive courses, progress tracking, and a modern UI. Built with React, TypeScript, and Tailwind CSS.",
      image: wisepath,
      tags: ["React", "TypeScript", "Tailwind CSS", "C# .Net"],
      link: "https://wisepath.lk"
    },
    {
      title: "Wisepath Mobile application",
      category: "Mobile Application",
      description: "The mobile application for Wisepath institute .",
      image: wisepathmobile,
      tags: ["React", "TypeScript", "Tailwind CSS", "C# .Net"],
      link: "https://wisepath.lk/wp-content/uploads/2025/12/wisepath_android.apk"
    },
   
  ];

  const experience = [
    {
      period: "2023 - PRESENT",
      role: "Freelance Web & Mobile Developer",
      company: "Self-Employed",
      description: "Architecting and building responsive web applications and native iOS/Android apps for global startups. Designing interfaces, handling cloud integrations, and guiding products from ideation to launch."
    },
    {
      period: "2021 - 2023",
      role: "Senior Frontend Engineer",
      company: "DevCore Agency",
      description: "Led frontend development for multi-tenant SaaS products. Set up TypeScript guidelines, optimized bundlers, and built reusable component libraries utilizing Tailwind CSS."
    },
    {
      period: "2019 - 2021",
      role: "Mobile App Engineer",
      company: "AppSphere Solutions",
      description: "Developed and published native Android (Kotlin) and cross-platform React Native apps. Managed app stores publication pipeline and push notification services."
    }
  ];

  return (
    <div 
      className="min-h-screen text-foreground transition-colors duration-300 overflow-x-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-opacity-80 transition-all">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[240px] border border-neutral-200 dark:border-neutral-800 shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 98%)",
                }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                    style={{
                      color: item.highlight ? "#C3E41D" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                      fontFamily: "'Fira Code', monospace"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C3E41D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight ? "#C3E41D" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div 
            className="text-4xl select-none" 
            style={{ 
              color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)", 
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" 
            }}
          >
            LP
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" className="relative min-h-screen flex flex-col justify-center">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="LAKINDU"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="PERERA"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

           {/* Profile Picture */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
  <ScrollReveal variant="scale-up" delay={500} duration={1000}>
    <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
      <img
        src={profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  </ScrollReveal>
</div>
          </div>
        </div>

        {/* Tagline - Proper Distance Below Hero */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Freelance Web & Mobile App Developer."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-neutral-500 hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-colors duration-300 animate-bounce" />
        </a>
      </main>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Section Header Title */}
          <div className="md:col-span-4">
            <ScrollReveal variant="slide-right" duration={800}>
              <h2 
                className="text-4xl md:text-5xl font-bold tracking-tighter"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                ABOUT<span className="text-[#C3E41D]">_</span>
              </h2>
              <p className="mt-4 text-neutral-500 text-lg" style={{ fontFamily: "'Antic', sans-serif" }}>
                A passionate Software Engineer with a keen eye for designing innovation.
              </p>
            </ScrollReveal>
          </div>

          {/* About description content */}
          <div className="md:col-span-8 space-y-6 text-lg text-neutral-600 dark:text-neutral-300" style={{ fontFamily: "'Antic', sans-serif" }}>
            <ScrollReveal variant="slide-up" delay={100} duration={800}>
              <p>
                Hi, I'm Lakindu. I design and build highly interactive, responsive web interfaces and iOS & Android applications. As a freelance developer, I partner directly with founders and technical leaders to turn specifications into production-ready software.
              </p>
            </ScrollReveal>
            
            <ScrollReveal variant="slide-up" delay={200} duration={800}>
              <p>
                My stack is focused on modern JS/TS frameworks, using React and Next.js on the web, and React Native for unified cross-platform mobile apps. I prioritize high performance, minimal load times, and fluid micro-animations that keep users engaged.
              </p>
            </ScrollReveal>

            {/* Quick Freelance stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
              <ScrollReveal variant="slide-up" delay={300} className="w-full">
                <p className="text-3xl md:text-4xl font-bold text-[#C3E41D]" style={{ fontFamily: "'Fira Code', monospace" }}><CountUp target={5} suffix="+" /></p>
                <p className="text-sm text-neutral-500 uppercase mt-1">Years Coding</p>
              </ScrollReveal>
              <ScrollReveal variant="slide-up" delay={400} className="w-full">
                <p className="text-3xl md:text-4xl font-bold text-[#C3E41D]" style={{ fontFamily: "'Fira Code', monospace" }}>25+</p>
                <p className="text-sm text-neutral-500 uppercase mt-1">Projects Shipped</p>
              </ScrollReveal>
              <ScrollReveal variant="slide-up" delay={500} className="w-full">
                <p className="text-3xl md:text-4xl font-bold text-[#C3E41D]" style={{ fontFamily: "'Fira Code', monospace" }}>100%</p>
                <p className="text-sm text-neutral-500 uppercase mt-1">Satisfaction</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/30 dark:bg-neutral-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <ScrollReveal variant="fade-in">
              <h2 
                className="text-4xl md:text-5xl font-bold tracking-tighter"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                TOOLKIT<span className="text-[#C3E41D]">_</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-in" delay={150}>
              <p className="mt-3 text-neutral-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Antic', sans-serif" }}>
                My primary workspace languages, libraries, and frameworks categorized for web and mobile.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, idx) => (
              <ScrollReveal 
                key={category.title}
                variant="slide-up"
                delay={idx * 150}
                duration={800}
                className="h-full"
              >
                <div 
                  className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black hover:border-[#C3E41D] dark:hover:border-[#C3E41D] transition-all duration-300 group h-full"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 group-hover:bg-[#C3E41D]/10 transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-xl" style={{ fontFamily: "'Fira Code', monospace" }}>{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-[#C3E41D] hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-all duration-200 font-mono"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <ScrollReveal variant="slide-right">
              <h2 
                className="text-4xl md:text-5xl font-bold tracking-tighter"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                PROJECTS<span className="text-[#C3E41D]">_</span>
              </h2>
              <p className="mt-3 text-neutral-500 text-lg" style={{ fontFamily: "'Antic', sans-serif" }}>
                Selected client projects, mobile applications, and headless web deployments.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, idx) => (
              <ScrollReveal 
                key={idx} 
                variant="scale-up" 
                delay={(idx % 2) * 150} 
                duration={900}
              >
                <div 
                  className="group flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-black hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 h-full"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded bg-black/80 dark:bg-black/90 text-[#C3E41D] border border-neutral-800 font-mono">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 
                      className="text-2xl font-bold tracking-tight mb-3 group-hover:text-[#C3E41D] transition-colors"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-1 text-base leading-relaxed" style={{ fontFamily: "'Antic', sans-serif" }}>
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Project Link */}
                    <a 
                      href={project.link}
                      className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-neutral-800 dark:text-white hover:text-[#C3E41D] dark:hover:text-[#C3E41D] transition-colors group/link mt-auto self-start"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      View Project
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/30 dark:bg-neutral-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <ScrollReveal variant="fade-in">
              <h2 
                className="text-4xl md:text-5xl font-bold tracking-tighter"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                EXPERIENCE<span className="text-[#C3E41D]">_</span>
              </h2>
              <p className="mt-3 text-neutral-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Antic', sans-serif" }}>
                A career summary showing both agency contracts and freelance client projects.
              </p>
            </ScrollReveal>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-neutral-200 dark:border-neutral-800 pl-6 md:pl-8 space-y-12">
            {experience.map((item, idx) => (
              <ScrollReveal 
                key={idx} 
                variant="slide-left" 
                delay={idx * 150} 
                duration={850}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4.5 h-4.5 rounded-full bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 group-hover:border-[#C3E41D] group-hover:bg-[#C3E41D] transition-all duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-black" />
                </div>

                {/* Job metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 
                      className="text-2xl font-bold tracking-tight"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {item.role}
                    </h3>
                    <p className="text-neutral-500 font-mono text-sm mt-0.5" style={{ fontFamily: "'Fira Code', monospace" }}>
                      {item.company}
                    </p>
                  </div>
                  <span 
                    className="px-3 py-1 text-xs font-bold tracking-wide rounded bg-neutral-200 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 self-start sm:self-center font-mono"
                  >
                    {item.period}
                  </span>
                </div>

                {/* Job description */}
                <p 
                  className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {item.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <ScrollReveal variant="slide-right">
              <h2 
                className="text-4xl md:text-5xl font-bold tracking-tighter"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                CONTACT<span className="text-[#C3E41D]">_</span>
              </h2>
              <p className="text-neutral-500 text-lg leading-relaxed animate-pulse" style={{ fontFamily: "'Antic', sans-serif" }}>
                Have an idea for a web or mobile application? Feel free to reach out. I typically respond to freelance inquiries within 24 hours.
              </p>

              <div className="space-y-4 pt-6" style={{ fontFamily: "'Fira Code', monospace" }}>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-[#C3E41D]" />
                  <span className="text-neutral-600 dark:text-neutral-300">Freelance Contracts Open</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[#C3E41D]" />
                  <span className="text-neutral-600 dark:text-neutral-300">verdentperera@gmail.com</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

{/* Contact Form */}
<div className="md:col-span-7">
  <form 
    // ================================
    // CHANGE THIS LINK:
    // Replace YOUR_FORM_ID with your Formspree form ID
    // Example:
    // https://formspree.io/f/xabcd123
    // ================================
    action="https://formspree.io/f/xeewqbrw"

    // Formspree requires POST method
    method="POST"

    className="space-y-6"
    style={{ fontFamily: "'Antic', sans-serif" }}
  >

    {/* 
      Optional:
      After successful submission Formspree redirects here.
      Change this URL to your own thank-you page.
    */}
    <input
      type="hidden"
      name="_next"
      value="https://yourdomain.com/thank-you"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <ScrollReveal variant="slide-up" delay={100} duration={700}>
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-bold uppercase tracking-wider mb-2"
          >
            Name
          </label>

          <input 
            type="text"
            id="name"

            // Formspree uses this name
            name="name"

            required
            placeholder="John Doe"

            className="w-full px-4 
            py-3 rounded-lg 
            border border-neutral-200 
            dark:border-neutral-800 
            bg-white dark:bg-black 
            focus:border-[#C3E41D] 
            dark:focus:border-[#C3E41D] 
            focus:ring-1 
            focus:ring-[#C3E41D] 
            outline-none 
            transition-all 
            text-foreground"
          />
        </div>
      </ScrollReveal>


      <ScrollReveal variant="slide-up" delay={200} duration={700}>
        <div>

          <label 
            htmlFor="email" 
            className="block text-sm font-bold uppercase tracking-wider mb-2"
          >
            Email Address
          </label>


          <input 
            type="email"
            id="email"

            // Sender email
            name="email"

            required
            placeholder="john@example.com"

            className="w-full px-4 
            py-3 rounded-lg 
            border border-neutral-200 
            dark:border-neutral-800 
            bg-white dark:bg-black 
            focus:border-[#C3E41D] 
            dark:focus:border-[#C3E41D] 
            focus:ring-1 
            focus:ring-[#C3E41D] 
            outline-none 
            transition-all 
            text-foreground"
          />

        </div>
      </ScrollReveal>

    </div>



    <ScrollReveal variant="slide-up" delay={300} duration={700}>
      <div>

        <label 
          htmlFor="project" 
          className="block text-sm font-bold uppercase tracking-wider mb-2"
        >
          Project Details
        </label>


        <textarea 

          id="project"

          // Message content
          name="project"

          rows={5}
          required

          placeholder="Describe your web or mobile app project (e.g. features, target platforms, timeline)..."

          className="w-full px-4 
          py-3 rounded-lg 
          border border-neutral-200 
          dark:border-neutral-800 
          bg-white dark:bg-black 
          focus:border-[#C3E41D] 
          dark:focus:border-[#C3E41D] 
          focus:ring-1 
          focus:ring-[#C3E41D] 
          outline-none 
          transition-all 
          text-foreground 
          resize-none"

        />

      </div>
    </ScrollReveal>




    <ScrollReveal variant="slide-up" delay={400} duration={700}>

      <Button 
        type="submit"

        className="w-full py-4 
        text-base font-bold 
        bg-[#C3E41D] 
        text-black 
        hover:bg-opacity-95 
        font-mono"

        style={{ fontFamily: "'Fira Code', monospace" }}

      >
        Send Proposal
      </Button>

    </ScrollReveal>


  </form>
</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500" style={{ fontFamily: "'Fira Code', monospace" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} LAKINDU PERERA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/LAKEY82?tab=overview&from=2026-06-01&to=2026-06-04" className="hover:text-[#C3E41D] transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/lakindu-perera-2988b91b5/" className="hover:text-[#C3E41D] transition-colors">LinkedIn</a>
            <a href="https://www.upwork.com/freelancers/~01aaf9522a8cf4374a?mp_source=share" className="hover:text-[#C3E41D] transition-colors">Upwork</a>
          </div>
        </div>
      </footer>
    {/* WhatsApp floating button */}
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-1/3 transform -translate-y-1/2 bg-[#25D366] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:opacity-90 z-50"
      aria-label="Chat on WhatsApp"
    >
      {/* Simple WhatsApp icon using SVG */}
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
</svg>
    </a>
    </div>
  );
}
