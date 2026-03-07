/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dss: {
          dark: "#2C2C2C",
          darker: "#1A1A1A",
          header: "#3A3A3A",
          sidebar: "#4A4A4A",
          panel: "#5A5A5A",
          accent: "#F39C12",
          green: "#27AE60",
          red: "#E74C3C",
          orange: "#E67E22",
          peach: "#FDEBD0",
          border: "#666666",
          text: "#EEEEEE",
          muted: "#AAAAAA",
        },
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', "sans-serif"],
        body: ['"Barlow"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
