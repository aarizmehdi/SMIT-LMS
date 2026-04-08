/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SMIT Legacy Palette (1:1 Restoration)
        'smit-blue': '#0A21C0',
        'smit-green': '#90BC4E',
        'navy-abyss': '#000105',
        'heritage-navy': '#00030A',
        'luminous-green': '#90BC4E',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0A21C0 0%, #10B981 100%)',
      }
    },
  },
  plugins: [],
}
