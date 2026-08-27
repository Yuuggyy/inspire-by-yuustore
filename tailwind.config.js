/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // INSPIRE brand — same YuuStore family but more premium/tech feel
        background: "#0a0a0f",
        surface: "#13131a",
        "surface-light": "#1e1e28",
        accent: {
          DEFAULT: "#e59d02",
          hover: "#f5b32d",
          dark: "#c08800",
          glow: "rgba(229, 157, 2, 0.15)",
        },
        heading: "#ffffff",
        default: "#e8e8ef",
        muted: "#7a7a8c",
        "accent-blue": "#3b82f6",
        "accent-green": "#10b981",
      },
      fontFamily: {
        display: ["Raleway", "system-ui", "sans-serif"],
        body: ["Roboto", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
