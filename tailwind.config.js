module.exports = {
  purge: [
    '/Users/justincaovan/Desktop/Projects/Weather/script.js',
    '/Users/justincaovan/Desktop/Projects/Weather/index.html',
    ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily : {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'] 
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    },
  },
  plugins: [],
}
