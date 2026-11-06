/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#f8fafc", 900: "#ffffff", 800: "#f1f5f9", 700: "#e2e8f0" },
        brand: { DEFAULT: "#f97316", light: "#ea580c", dark: "#c2410c" },
        aqua: "#0f766e"
      },
      boxShadow: { glow: "0 12px 40px rgba(249,115,22,.16)" },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] }
    }
  },
  plugins: []
};
