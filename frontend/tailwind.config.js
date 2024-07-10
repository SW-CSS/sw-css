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
        black: '#333333',
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
        admin: {
          white: '#FFFFFF',
          black: '#333333',
          comment: '#4E5963',
          border: '#DEE2E6',
          background: {
            light: '#F0F0F0',
            base: '#B0B0B0',
          },
          primary: {
            light: '#3B80C7',
            main: '#095DB3',
            dark: '#053566',
          },
          secondary: {
            light: '#F0F0F0',
            main: '#7F7F7F',
            dark: '#3F3F3F',
          },
          semantic: {
            error: 'B30818',
          },
        },
      },
      fontSize: {
        xs: ['12px', '14px'],
        sm: ['14px', '16px'],
        base: ['16px', '18px'],
        lg: ['20px', '22px'],
        xl: ['32px', '34px'],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '4px',
        sm: '10px',
        md: '20px',
        lg: '30px',
        full: '100%',
      },
      width: {
        sign: '500px',
      },
    },
  },
  plugins: [],
};
