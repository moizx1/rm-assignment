/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        md: "820px",
      },
      colors: {
        dark: {
          background: "#121212",
          text: "#ffffff",
        },
        light: {
          background: "#ffffff",
          text: "#000000",
        },
      },
    },
  },
  plugins: [],
};
