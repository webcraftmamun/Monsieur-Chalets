/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        heading: "#0A0A0A",
        paragraph: "#525252",
        lightParagraph: "#8F8F8F",
        background: "#F5F5F5",
      },
      fontFamily: {
        libre: ['"Libre Caslon Text"', ...defaultTheme.fontFamily.serif], // For headings
        inter: ['"Inter"', ...defaultTheme.fontFamily.sans], // For body text
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 8s linear infinite",
      },
    },
  },
  plugins: [],
};
