import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0D0F14",
          secondary: "#13161E",
          elevated: "#1A1E2A",
        },
        text: {
          primary: "#E8EAF0",
          secondary: "#8B90A0",
          muted: "#4A5068",
        },
        accent: {
          DEFAULT: "#00D4AA",
          hover: "#00EFC0",
        },
        gold: {
          DEFAULT: "#F5A623",
        },
        border: {
          subtle: "#1E2230",
          DEFAULT: "#252A3A",
          strong: "#353A50",
        },
        tag: {
          bg: "#1E2230",
          border: "#2A3048",
          text: "#8B90A0",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'Fira Code'", "'JetBrains Mono'", "Consolas", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h1: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.125rem, 2vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        container: "1120px",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
