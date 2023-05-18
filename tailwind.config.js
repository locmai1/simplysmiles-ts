/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-default": "#12368E",
        "secondary-default": "#FFFFFF",
        "primary-hover": "#062267",
        "secondary-hover": "#F2F2F2",
        "light-green": "#DDF3CC",
        "light-red": "#EB5757",
        "dark-red": "#A02525",
        "dark-gray": "#333333",
      },
    },
  },
  plugins: [],
};
