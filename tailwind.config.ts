import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
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
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        textReveal: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        ping: {
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
        carousel: {
          "0%": { transform: "translateY(0)" },
          "33%": { transform: "translateY(0)" },
          "33.1%": { transform: "translateY(-120px)" },
          "66%": { transform: "translateY(-120px)" },
          "66.1%": { transform: "translateY(-240px)" },
          "99%": { transform: "translateY(-240px)" },
          "99.1%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out",
        scaleIn: "scaleIn 0.2s ease-out",
        "fade-in": "fadeIn 0.6s ease-in-out forwards",
        "fade-in-delay": "fadeIn 0.6s ease-in-out 0.3s forwards",
        "fade-in-delay-2": "fadeIn 0.6s ease-in-out 0.6s forwards",
        "fade-in-delay-3": "fadeIn 0.6s ease-in-out 0.9s forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "text-reveal":
          "textReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 8s ease-in-out 1s infinite",
        "float-slow": "float 10s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        carousel: "carousel 15s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 15px rgba(250, 204, 21, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
