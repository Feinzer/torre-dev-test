module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1b1b1b',
        secondary: '#313236',
        accent: '#77ff85',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
