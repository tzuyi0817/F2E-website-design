/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        bg: '#FFC37D',
        primary: '#007FAB',
        'primary-dark': '#003A4F',
        'primary-tint': '#B0D2DE',
        secondary: '#FFC37D',
        'secondary-dark': '#A46039',
        'secondary-tint': '#FFE2A9',
        highlight: '#FF5136',
        'highlight-dark': '#CD331A',
        'highlight-tint': '#FFB5A4',
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
}