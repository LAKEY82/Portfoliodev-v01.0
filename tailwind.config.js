/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: {
          DEFAULT: "var(--accent)",
          ink: "var(--accent-ink)",
          fg: "var(--accent-fg)",
        },
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      fontFamily: {
        sans: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid type scale — display sizes tuned to Archivo at 66% width (see .type-display).
        mega: ["clamp(3.75rem, 14.5vw, 17rem)", { lineHeight: "0.82", letterSpacing: "-0.03em" }],
        section: ["clamp(3.4rem, 11vw, 12.5rem)", { lineHeight: "0.82", letterSpacing: "-0.025em" }],
        title: ["clamp(2.4rem, 4.8vw, 5.25rem)", { lineHeight: "0.88", letterSpacing: "-0.02em" }],
        statement: ["clamp(1.6rem, 3.3vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.022em" }],
        lead: ["clamp(1rem, 1.1vw, 1.125rem)", { lineHeight: "1.6" }],
        meta: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [tailwindAnimate],
}
