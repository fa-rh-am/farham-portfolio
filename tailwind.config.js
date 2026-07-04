/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F6F1E7',
          soft: '#FBF8F1',
          deep: '#EDE5D3',
        },
        ink: {
          DEFAULT: '#243238',
          soft: '#59696F',
          faint: '#8B9A9C',
        },
        sky: {
          DEFAULT: '#6C9BB8',
          deep: '#3E6E8E',
          pale: '#CFE2EA',
        },
        sage: {
          DEFAULT: '#89A98E',
          deep: '#5A7D62',
          pale: '#DAE7D8',
        },
        gold: {
          DEFAULT: '#E3B655',
          deep: '#C99A3A',
          pale: '#F3E3B8',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(36, 50, 56, 0.18)',
        card: '0 10px 30px -12px rgba(36, 50, 56, 0.14)',
      },
      backgroundImage: {
        'contour': "radial-gradient(circle at 20% 20%, rgba(108,155,184,0.08), transparent 40%), radial-gradient(circle at 80% 60%, rgba(227,182,85,0.10), transparent 45%), radial-gradient(circle at 50% 90%, rgba(137,169,142,0.10), transparent 40%)",
      },
    },
  },
  plugins: [],
}
