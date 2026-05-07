/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "colors-accents-cyan": "var(--colors-accents-cyan)",
      },
      boxShadow: {
        "3d-dark-2": "var(--3d-dark-2)",
      },
    },
  },
  plugins: [],
};