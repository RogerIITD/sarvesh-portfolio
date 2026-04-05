import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f0f7f4",
        primary: "#2d8f6f",
        secondary: "#1a2744",
        accent: "#f59e0b",
        card: "#ffffff",
        text: "#1e293b",
        parchment: "#e8f5ef",
        linen: "#dff0ea",
        chai: "#c6e4d5",
      },
      fontFamily: {
        heading: ["Georgia", "Times New Roman", "serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        shayari: ["Tiro Devanagari Hindi", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "wave-1": "wave 1s ease-in-out infinite 0s",
        "wave-2": "wave 1s ease-in-out infinite 0.1s",
        "wave-3": "wave 1s ease-in-out infinite 0.2s",
        "wave-4": "wave 1s ease-in-out infinite 0.3s",
        "wave-5": "wave 1s ease-in-out infinite 0.4s",
        "pulse-glow": "pulse-glow 3s infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        wave: {
          "0%, 100%": { height: "8px" },
          "50%": { height: "20px" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(45, 143, 111, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(45, 143, 111, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
