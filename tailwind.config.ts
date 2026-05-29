import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cakap.AI design system custom brand colors
        brand: {
          primary: {
            DEFAULT: "#0F766E", // Deep Teal
            dark: "#005C55",
            light: "#80D5CB",
            container: "#9CF2E8",
          },
          secondary: {
            DEFAULT: "#006B5F",
            container: "#62FAE3",
          },
          surface: {
            DEFAULT: "#F8FAFC", // Off-White
            dim: "#D2D9F4",
            container: "#EAEDFF",
          },
          text: {
            DEFAULT: "#0F172A", // Dark Slate
            muted: "#3E4947",
          },
          outline: {
            DEFAULT: "#6E7977",
            variant: "#BDC9C6",
          },
          error: {
            DEFAULT: "#BA1A1A",
            container: "#FFDAD6",
          },
        },
        // Mappings matching Tailwind v4 CSS variables
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
