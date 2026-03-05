/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand (soft & elegant)
        plum: {
          50: "#FAF7FF",
          100: "#F2EAFF",
          200: "#E6D6FF",
          300: "#D4B9FF",
          400: "#B88CFF",
          500: "#9A5BFF",
          600: "#7F3AE6",
          700: "#642CC0",
          800: "#4F2396",
          900: "#3C1B73",
        },
        rose: {
          50: "#FFF5FA",
          100: "#FFE4F1",
          200: "#FFC7E3",
          300: "#FF9ECC",
          400: "#FF6EAE",
          500: "#FF3E91",
          600: "#E62677",
          700: "#BF1E62",
          800: "#97194E",
          900: "#73133B",
        },
        // Elegant neutrals
        ink: "#1B1320",
        cloud: "#FBF7FF",
        mist: "#F3EEF8",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(27, 19, 32, 0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
