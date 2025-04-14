import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
        secondary: {
          DEFAULT: "#10B981",
          dark: "#059669",
        },
        background: {
          dark: "#1E293B",
          light: "#F1F5F9",
        },
        dark: {
          bg: "#1E293B",
          text: "#F1F5F9",
          card: "#334155",
          border: "#475569",
        },
        light: {
          bg: "#F1F5F9",
          text: "#1E293B",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out",
        scaleIn: "scaleIn 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
