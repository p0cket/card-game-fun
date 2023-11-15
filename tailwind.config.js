/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'boy-green': '#5a7d2a',
        'boy-lightgreen': '#e6ecc3',
        // and so on for all your custom colors
      },
    },
  },
  variants: {},

  plugins: [],
}
