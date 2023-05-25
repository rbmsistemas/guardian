/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    // ...
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "gap-primary": "#62447f",
        "gap-green": "#99b447",
        "gap-white": "#f8f5f5",
        "gap-orange": "#fd933e",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
