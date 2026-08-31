import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core palette — a bright, pastel take on the same Madras materials.
        ivory: "#F8F5EC", // half-white, the base background
        cloud: "#FFFFFF", // raised panels/cards, sits on top of ivory
        mist: "#DBD7C9", // light grey, borders & dividers
        olive: "#5C6B3E", // olive green, primary accent
        pine: "#3B4229", // deep olive, primary text on light backgrounds
        rust: "#A6553D", // warm terracotta, errors & attention
        marigold: "#E2A93D", // marigold, bright secondary accent
        sage: "#8FA876", // sage leaf, tags & confirmations
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(59,66,41,0.05) 1px, transparent 0)",
      },
      keyframes: {
        "draw-line": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
