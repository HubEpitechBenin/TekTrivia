/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // très important pour utiliser la classe dark
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
        fontFamily: {
          body: ['Inter', 'sans-serif'],
        },
        colors: {
          pm: {
            blue: '#093F68',
            blue300: '#4D83AC',
            blue600: '#11324A',
            black: '#000000',
            rank: '#0D1117',
            rankBorder: '#3D444D',
            rightSidebar: '#010409',
            card: '#1A1F26',
            border: '#3D444D',
          },
        },
    },
  },
  plugins: [],
};

