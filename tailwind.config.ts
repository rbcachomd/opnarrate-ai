import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obgyn: {
          maroon: "#7A1F3D",
          navy: "#1F3A5F",
        },
      },
    },
  },
  plugins: [],
};

export default config;
