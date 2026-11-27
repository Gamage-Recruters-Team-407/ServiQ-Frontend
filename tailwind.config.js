/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
          soft: "#FDBA74",
          wash: "#FFF7ED",
        },
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E2E8F0",
      },
      boxShadow: {
        card: "0 8px 30px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
