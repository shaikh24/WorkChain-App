/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: { soft: '0 10px 25px rgba(0,0,0,0.08)' },
      borderRadius: { '2xl': '1rem' }
    }
  },
  plugins: []
}
