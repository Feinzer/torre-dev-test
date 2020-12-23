module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1b1b1b',
          primary: '#2c2c2c',
        },
        light: {
          background: '#f6f6f6',
          primary: '#ffffff',
        },
        accent: '#77ff85',
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover', 'group-hover'],
      borderWidth: ['dark'],
      borderRadius: ['last'],
      backgroundOpacity: ['dark']
    },
  },
  plugins: [],
}
