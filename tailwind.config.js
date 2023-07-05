/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: " #00b39e",
      },
      fontFamily: {
        ds: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
