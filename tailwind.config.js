/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        paper: "var(--paper)",
        accent: "var(--accent)",
        technical: "var(--technical)",
        "white-soft": "var(--text-soft)",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
