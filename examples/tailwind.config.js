// This is only an example
const yourlib = require("@yourcompany/libraryname/tailwind.config.js")

module.exports = {
  purge: ["./static/**/*.html", "./**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: yourlib.theme,
  variants: {
    extend: {},
  },
  corePlugins: yourlib.corePlugins,
  plugins: [],
}
