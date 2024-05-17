/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      md: "1000px",
      sm: "640px",
    },
    extend: {
      colors: {
        primary: "#015249",
        primarydark: "#043933",
        herobg: "#6496c8",
        secondary: "#043933",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
