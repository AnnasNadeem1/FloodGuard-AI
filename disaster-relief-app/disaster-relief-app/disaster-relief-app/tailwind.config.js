/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' }, // Soft Blue
        secondary: { 50: '#f8fafc', 100: '#f1f5f9', 500: '#64748b', 900: '#0f172a' }, // Slate
        danger: { 50: '#fef2f2', 500: '#ef4444', 700: '#b91c1c' }, // Soft Red
        success: { 50: '#f0fdf4', 500: '#22c55e' }, // Green
        warning: { 50: '#fefce8', 500: '#eab308' }, // Yellow
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}