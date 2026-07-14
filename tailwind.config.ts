import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      opacity: {
        8: "0.08",
      },
      colors: {
        // Endüstriyel grafit / antrasit zemin
        graphite: {
          950: "#0b0d10",
          900: "#111418",
          850: "#171b20",
          800: "#1d2228",
          700: "#282e36",
          600: "#3a424c",
          500: "#4e5762",
          400: "#6b7683",
          300: "#8f99a5",
          200: "#b9c1cb",
          100: "#dde2e8",
        },
        // Bakır / amber vurgu (metal hissi)
        copper: {
          50: "#fdf4ec",
          100: "#f9e2cd",
          200: "#f2c39b",
          300: "#e89e63",
          400: "#df7f38",
          500: "#c9631d", // ana vurgu
          600: "#a94e16",
          700: "#853c14",
          800: "#5f2c10",
          900: "#3d1d0b",
        },
        // Açık nötr gri (light bölümler)
        neutralx: {
          50: "#f7f7f6",
          100: "#eeeeec",
          200: "#e2e2df",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.06), 0 8px 24px -12px rgba(0,0,0,0.18)",
        glow: "0 8px 30px -8px rgba(201,99,29,0.45)",
      },
      backgroundImage: {
        "metal-grid":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
