module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1b1b1b',
          primary: '#313236',
          accent: '#77ff85',
        },
        light: {
          background: 'white',
          primary: '#f5f5f5',
          accent: '#3cff50',
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'],
    },
  },
  plugins: [],
}
