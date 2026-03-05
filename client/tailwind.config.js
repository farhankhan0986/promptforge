/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "#6D8196",
      sidebar: "#4A4A4A",
      surface: "#CBCBCB",
      background: "#FFFFE3",
      textdark: "#4A4A4A"
    }
  }
},
  plugins: [],
}