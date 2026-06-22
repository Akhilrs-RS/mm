/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: {
            light: '#F4E0A5',
            DEFAULT: '#D4AF37', // Metallic gold
            dark: '#AA7C11',
            shimmer: '#FFDF73',
          },
          onyx: {
            light: '#2A2A2A',
            DEFAULT: '#121212', // Warm deep black
            dark: '#0A0A0A',
          },
          ivory: {
            light: '#FFFFFF',
            DEFAULT: '#FAF9F6', // Off-white alabaster
            dark: '#F0EFEA',
          },
          emerald: {
            light: '#0A5F38',
            DEFAULT: '#043927', // Deep green stone color
            dark: '#022418',
          },
          ruby: {
            light: '#9E1B32',
            DEFAULT: '#721C24',
            dark: '#4A0E17',
          },
          sapphire: {
            light: '#1E3A8A',
            DEFAULT: '#0F2C59',
            dark: '#081730',
          }
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
