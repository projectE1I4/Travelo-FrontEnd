/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        cus: '10px',
      },
      fontSize: {
        'h1-d': '40px',
        'h2-d': '32px',
        'h3-d': '24px',
        'h1-m': '32px',
        'h2-m': '24px',
      },
      colors: {
        transparent: 'transparent',
        current: 'current',
        pc1: '#4d76b3',
        pc2: '#f6f6f6',
        ac: '#64bdab',
        txt400: '#cccccc',
        txt500: '#666666',
        txt600: '#222222',
        btntxt: '#ffffff',
        btnbg: '#ffffff',
        iconred: '#ff4040',
      },
    },
  },
  plugins: [],
};
