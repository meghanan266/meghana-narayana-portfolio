module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds
        dark: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1a1a1a",
          700: "#2a2a2a",
        },
        // Warm accent (primary)
        apricot: {
          DEFAULT: "#F7882F",
          light: "#F9A35C",
          dark: "#D96E1A",
        },
        // Secondary accent
        citrus: {
          DEFAULT: "#F7C331",
        },
        // Muted tone
        blueberry: {
          DEFAULT: "#6B7A8F",
          light: "#8A97A8",
        },
        // Warm whites for light sections
        cream: {
          DEFAULT: "#F5F0EB",
          light: "#FAFAF8",
          dark: "#E8E0D8",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Playfair Display", "serif"],
        accent: ["Caveat", "cursive"],
      },
      fontSize: {
        "display-lg": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 5vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "blur-in": "blurIn 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(10px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};
