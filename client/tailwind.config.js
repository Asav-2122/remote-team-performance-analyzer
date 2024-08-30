/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode with a class
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#1E40AF", // Light theme primary color
          dark: "#1E40AF", // Dark theme primary color (same in this case, adjust if needed)
        },
        secondary: {
          light: "#F59E0B", // Light theme secondary color
          dark: "#F59E0B", // Dark theme secondary color (same in this case, adjust if needed)
        },
        background: {
          light: "#F3F4F6", // Light theme background color
          dark: "#333333", // Dark theme background color
        },
        text: {
          light: "#111827", // Light theme text color
          dark: "#F3F4F6", // Dark theme text color
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        "1/2": "50%",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"],
    },
  },
  plugins: [],
};
