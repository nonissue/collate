/* eslint-disable */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 'media' or 'class'
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        almostblack: "hsl(221, 30%, 7%)",
        white: "#fff",
      },
      fontSize: {
        xxs: ".625rem",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
