/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      "dark-purple":'#000',
      "light-white":'rgba(255,255,255,0.18)'
    },
  },
  plugins: [],
}