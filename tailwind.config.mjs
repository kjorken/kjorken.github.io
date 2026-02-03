import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Source Sans 3 Variable',
          ...fontFamily.sans,
        ],
        heading: [
          'Plus Jakarta Sans Variable',
          ...fontFamily.sans,
        ],
      },
      colors: {
        /* Design system: use var(--accent) in CSS for theme-aware light/dark */
        accent: {
          DEFAULT: '#0D9488', // Teal (light mode)
          hover: '#0F766E',
          muted: '#CCFBF1',
        },
      },
    },
  },
  plugins: [],
};
