/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        violet: "#392a59",
        indigo: "#9a8df2",
        tangerine: "#f2935c",
        coral: "#f2845c",
        champagne: "#f2ddd5",
      },
      fontFamily: {
        sans: ["Inter Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
