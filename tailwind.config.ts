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
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        gold: "var(--gold)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-vazirmatn)", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 40px rgba(0,0,0,0.5)",
        glow: "0 0 32px rgba(212,175,55,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
