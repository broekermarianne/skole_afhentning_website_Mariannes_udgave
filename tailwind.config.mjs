/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Moss green — calm, institutional, distinct from the usual SaaS blue.
        brand: {
          50: "#EFF4EF",
          100: "#DCE8DD",
          200: "#B9D2BC",
          300: "#8FB794",
          400: "#5F9468",
          500: "#3F6652",
          600: "#335345",
          700: "#2A4438",
          800: "#22362D",
          900: "#1C2C24",
        },
        // Ink — dark sections.
        dusk: {
          900: "#1E2630",
          800: "#27313D",
        },
        // Warm paper — replaces stark white as the light background.
        sand: {
          50: "#FBFAF7",
          100: "#F6F3EC",
          200: "#E8E2D4",
        },
        // Used sparingly: arrival confirmation, one warm accent point.
        amber: {
          400: "#D29A4E",
          500: "#C98A3A",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
