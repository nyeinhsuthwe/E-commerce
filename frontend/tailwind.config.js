/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgimg': "url('/src/assets/photo_2024-05-29_23-07-12.jpg')",
      }
    },
  },
  plugins: [],
}

