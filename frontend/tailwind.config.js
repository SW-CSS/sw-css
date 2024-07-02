/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1200px',
      },
      colors: {
        white: '#FFFFFF',
        black_text: '#333333',
        comment: '#898C96',
        border: '#EEEEF0',
        background: {
          light: '#F0F1F7',
          base: '#D2D4DC',
        },
        primary: {
          light: '#E6EBFD',
          main: '#5773F1',
          dark: '#1A40EB',
        },
        secondary: {
          light: '#64709B',
          main: '#26325C',
          dark: '#050A1C',
        },
      },
      fontSize: {
        xs: ['12px', '12px'],
        sm: ['14px', '14px'],
        base: ['16px', '16px'],
        lg: ['20px', '20px'],
        xl: ['32px', '32px'],
      },
    },
  },
  plugins: [],
};
