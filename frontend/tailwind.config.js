/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberpunk: {
          bg: '#050816',
          neonBlue: '#00F5FF',
          neonPurple: '#7B2FF7',
          accentPink: '#FF4D9D',
          whiteText: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00F5FF, 0 0 20px #00F5FF',
        'neon-purple': '0 0 10px #7B2FF7, 0 0 20px #7B2FF7',
        'neon-pink': '0 0 10px #FF4D9D, 0 0 20px #FF4D9D',
      }
    },
  },
  plugins: [],
}
