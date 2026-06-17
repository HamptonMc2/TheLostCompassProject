/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        compass: {
          black: '#050706',
          charcoal: '#121817',
          ink: '#1b2422',
          gold: '#c99a3b',
          blue: '#1e6d7a',
          teal: '#3f9f98',
          forest: '#244436',
          parchment: '#f3ead8',
          muted: '#bdb29c',
        },
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 55px rgba(201, 154, 59, 0.22)',
      },
    },
  },
  plugins: [],
};
