const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui', ],
      'serif': ['ui-serif', 'Georgia', ],
      'mono': ['ui-monospace', 'SFMono-Regular', ],
      'display': ['Oswald', ],
      'body': ['Open Sans',],
     },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};