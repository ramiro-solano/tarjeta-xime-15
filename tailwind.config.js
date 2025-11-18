/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        parisienne: ["Parisienne", "cursive"],
      },
    },
  },
  plugins: [],
}