/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    extend: {
      backgroundColor: {
        "basic-button": "#0f172a",
      },
      height: {
        916: "916px",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  // safelist: [
  //   'rounded-tl-[200px]', // Bảo đảm class này không bị loại bỏ
  // ],
  plugins: [],
};