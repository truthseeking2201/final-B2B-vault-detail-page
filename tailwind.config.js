/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0e1117',
        panel: '#111522',
        panelMuted: '#151a28',
        border: '#1d2534',
        borderMuted: '#252e41',
        primary: '#2e7bff',
        primaryStrong: '#1f6aff',
        accent: '#22c55e',
        warning: '#f6a93b',
        muted: '#8f9ab3',
      },
      fontFamily: {
        sans: ['\"Work Sans\"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 20px 60px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
