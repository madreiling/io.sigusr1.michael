/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{twig,html,ts,js}"],
  theme: {
    extend: {
      colors: {
        'io-background': '#0c0f18',
        'io-primary': '#3794de',
        'io-highlight': '#de7f1c',
        'cavs-wine': '#6f263d',
        'cavs-gold': '#dcb558'
      },
      fontFamily: {
        'sans': ['"Oswald"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
}
