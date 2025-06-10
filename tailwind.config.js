/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        "work-sans": ["Work Sans", "sans-serif"],
      },
      colors: {
        body: '#64748B',
        bodydark: '#AEB7C0',
        primary: '#3C50E0',

      }
    },
  },
  plugins: [],
}