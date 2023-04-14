/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'poke-red': '#EF5350',
        'poke-blue': '#2A75BB',
        'poke-yellow': '#FECA1B',
      },
    },
  },
  plugins: [],
};
