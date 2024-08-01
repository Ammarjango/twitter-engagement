/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // NOTE: It's fixing flickering issue
  // important: '#__next',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        roboto: ['Roboto'],
        russoone: ['Russo One'],
        poppins: ['Poppins'],
        open_sans: ['Open_Sans'],
      },

      screens: {
        xlm: '1440px',
        xll: '1536px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },

  plugins: [],
}
