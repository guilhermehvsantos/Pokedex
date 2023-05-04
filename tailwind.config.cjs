/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        '120': '120deg',
        '150' : '150deg',
      },
      colors: {
        brown: ' #945d09',
        secondary: '#ecc94b',
      },
      width: {
        '23': '94px',
      },
      height: {
        '0.25': '0.08rem',
      },
    },
  },
  plugins: [],
});