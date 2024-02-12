/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'maxim-color': '#F98404'
      }
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('#F98404', 'currentColor'),
      'primary':'#F98404'
    }),
    backgroundColor: theme =>({
      ...theme('colors'),
      'primary':'#F98404'
    })
  },
  darkMode:"class",
  plugins: [nextui()],
}
