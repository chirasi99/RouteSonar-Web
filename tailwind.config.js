// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // "font-display" utility → Syne (bold headings)
        display: ["Syne", "sans-serif"],
        // "font-sans" default → DM Sans (body copy)
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        // Re-export brand green as a named alias so it's easy to change
        brand: {
          DEFAULT: "#34d399", // emerald-400
          dark:    "#10b981", // emerald-500
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease both",
        "spin-slow": "spin 2s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%":   { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
