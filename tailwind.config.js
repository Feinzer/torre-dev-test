module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1b1b1b',
          primary: '#2c2c2c',
          accent: '#77ff85',
        },
        light: {
          background: '#f6f6f6',
          primary: '#ffffff',
          accent: '#22ff3c',
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'],
      borderWidth: ['dark']
    },
  },
  plugins: [],
}
