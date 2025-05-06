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
            blue:           '#093F68',
            blue300:        '#4D83AC',
            blue600:        '#11324A',
            blueHover:      '#1d6397',
            r10:            '#1A1F26',
            r12:            '#0D1117',
            rBorder:        '#3D444D',
            rBlack:         '#010409'
          },
        },
    },
  },
  plugins: [],
};

