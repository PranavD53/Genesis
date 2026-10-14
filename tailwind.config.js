/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Theme (Black + Silver + Lilac)
        gDark: {
          bg: '#050505',
          surface: '#0B0B0D',
          text: '#F5F5F5',
          silver: '#A7A7AD',
          muted: '#74747B',
          accent: '#B8A7FF',
          accentSoft: '#9180FF',
          border: 'rgba(184, 167, 255, 0.12)',
        },
        // Light Theme (Cream + Deep Green + Yellow)
        gLight: {
          bg: '#F7F1E5',
          surface: '#FFF9EE',
          beige: '#E6D9C4',
          text: '#304B32',
          green: '#58724A',
          muted: '#7D9270',
          accent: '#D6AA35',
          accentSoft: '#EBD58A',
          border: 'rgba(214, 170, 53, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
