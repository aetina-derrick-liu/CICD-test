/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#A5CD38',
        bgPrimary: '#E6E6E6',
        textPrimary: '#434343',
        secondary: '#333333',
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#eab308',
        info: '#14b8a6',
        light: '#9ca3af'
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ]
}
