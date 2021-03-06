module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#BE123C",
        "primary-dark": "#9F1239",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
