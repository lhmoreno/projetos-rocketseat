/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif']
    },
    fontSize: {
      xs: ['0.875rem', {lineHeight: '160%'}],
      sm: ['1rem', {lineHeight: '160%'}],
      base: ['1.125rem', {lineHeight: '160%'}],
      lg: ['1.25rem', {lineHeight: '160%'}],
      xl: ['1.5rem', {lineHeight: '140%'}],
      '2xl': ['2rem', {lineHeight: '140%'}]
    },
    borderRadius: {
      DEFAULT: '6px',
      lg: '8px',
      full: '50%'
    },
    colors: {
      white: '#ffffff',
      black: '#000000',

      'gray-900': '#121214',
      'gray-800': '#202024',
      'gray-300': '#8d8d99',
      'gray-200': '#c4c4cc',
      'gray-100': '#e1e1e6',

      'green-500': '#00875f',
      'green-300': '#00b37e'
    }
  },
  plugins: []
}

