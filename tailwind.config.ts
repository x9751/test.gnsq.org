import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "slideDownAndFade": "slideDownAndFade 0.3s ease-in-out forwards",
        "slideUpAndFade": "slideUpAndFade 0.3s ease-in-out forwards",
        "slideLeftAndFade": "slideLeftAndFade 0.3s ease-in-out forwards",
        "slideRightAndFade": "slideRightAndFade 0.3s ease-in-out forwards",
      },
      keyframes: {
        slideDownAndFade: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUpAndFade: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeftAndFade: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRightAndFade: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
