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
          'InterVariable',
          ...fontFamily.sans,
        ],
        heading: [
          'Gondens',
          'InterVariable',
          ...fontFamily.sans,
        ],
      },
      colors: {
        accent: {
          DEFAULT: '#a3ff12', // Neon/Lime Green
          light: '#d4ff7f',
          dark: '#6ad100',
        },
      },
    },
  },
  plugins: [],
};
