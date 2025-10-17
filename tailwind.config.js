/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lora': ['Lora', 'serif'],
        'amiri': ['Amiri', 'serif'],
        'cairo': ['Cairo', 'sans-serif'],
      },
      colors: {
        'eerie-black': '#1f2421',         // HSL: hsla(144, 7%, 13%, 1)
        'caribbean-current': '#216869',   // HSL: hsla(181, 52%, 27%, 1)
        'jungle-green': '#49a078',        // HSL: hsla(152, 37%, 46%, 1)
        'cambridge-blue': '#9cc5a1',      // HSL: hsla(127, 26%, 69%, 1)
        'platinum': '#dce1de',            // HSL: hsla(144, 8%, 87%, 1)
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
}

