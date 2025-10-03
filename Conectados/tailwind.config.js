/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25D366",   // Verde WhatsApp
        secondary: "#FFFFFF", // Blanco
      },
    },
  },
  plugins: [],
};
