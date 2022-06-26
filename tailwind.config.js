/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  purge: {
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#15803d",
          secondary: "#059669",
          accent: "#10b981",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
    darkTheme: "forest",
  },
  plugins: [require("daisyui")],
};
