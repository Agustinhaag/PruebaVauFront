/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#4285F4",
        "custom-white": "#F6F6F6",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [],
};
