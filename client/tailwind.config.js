/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      colors: {
        primary: "#f2d2cf",
        secondary: "#f5bcb7ff",
        ternary: "#f0a39c"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '3rem',
        },
      },
       animation: {
        'bounce-logo': 'bounceLogo 2s infinite',
         'fade-in': 'fadeIn 2s ease-in-out',
         'slide-in-right': 'slideInRight 1s ease-out',
         'slide-in-left': 'slideInLeft 1s ease-out',
          'slide-in-up': 'slideInUp 1s ease-out',
          'slide-in-down': 'slideInDown 1s ease-out',
          "spin-slow": "spin 2s linear ",
      },
       keyframes: {
        slideInUp: {
          '0%': {
            transform: 'translateY(-100%)', // Start off-screen at the top
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)', // End at normal position
            opacity: '1',
          },
        },
        slideInDown: {
          '0%': {
            transform: 'translateY(100%)', // Start off-screen at the bottom
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)', // End at normal position
            opacity: '1',
          },
        },
         slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)', // Start off-screen to the left
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)', // End at normal position
            opacity: '1',
          },
        },
        slideInRight: {
    '0%': {
      transform: 'translateX(100%)',
      opacity: '0',
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: '1',
    },
  },
        fadeIn: {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
        bounceLogo: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
        },
      },
    }

  },
  plugins: [],
}

