/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed": "#121c2c",
        "surface-container-high": "#e6e8e9",
        "surface-container": "#eceeee",
        "on-surface-variant": "#3e4949",
        "on-primary-fixed-variant": "#004f50",
        "primary-container": "#0d8282",
        "secondary-fixed": "#d9e3f9",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#2e3131",
        "surface-bright": "#f8fafa",
        "on-tertiary-fixed-variant": "#723514",
        "on-error-container": "#93000a",
        "on-tertiary-fixed": "#351000",
        "surface-container-highest": "#e1e3e3",
        "inverse-primary": "#78d6d5",
        "secondary-container": "#d6e0f6",
        "primary-fixed-dim": "#78d6d5",
        "error-container": "#ffdad6",
        "outline": "#6e7979",
        "tertiary-container": "#ab623c",
        "tertiary-fixed": "#ffdbcc",
        "on-primary-container": "#f3fffe",
        "error": "#ba1a1a",
        "on-surface": "#191c1d",
        "on-secondary-fixed-variant": "#3d4759",
        "on-error": "#ffffff",
        "on-primary": "#ffffff",
        "surface-tint": "#006a6a",
        "surface-dim": "#d8dada",
        "surface": "#f8fafa",
        "on-tertiary-container": "#fffbff",
        "background": "#f8fafa",
        "on-background": "#191c1d",
        "secondary-fixed-dim": "#bdc7dc",
        "surface-container-low": "#f2f4f4",
        "inverse-on-surface": "#eff1f1",
        "secondary": "#555f71",
        "outline-variant": "#bdc9c8",
        "on-primary-fixed": "#002020",
        "surface-variant": "#e1e3e3",
        "primary": "#006767",
        "tertiary": "#8d4a26",
        "tertiary-fixed-dim": "#ffb693",
        "surface-container-lowest": "#ffffff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#596376",
        "primary-fixed": "#94f2f2"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Manrope_700Bold", "sans-serif"],
        "body": ["Inter_400Regular", "sans-serif"],
        "label": ["Inter_500Medium", "sans-serif"]
      }
    },
  },
  plugins: [],
}
