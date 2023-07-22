const fallbackFonts = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans"`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      text: `Nunito, ${fallbackFonts}, sans-serif`,
      interface: `Nunito, ${fallbackFonts}, sans-serif`,
    },
    extend: {
      colors: {
        neutral: {
          400: '#858585', // labels, captions
          900: '#151515', // primary text
        },
        gray: {
          100: '#F7F8FA',
          200: '#F2F4F7',
          300: '#EDEFF3',
          400: '#E8EBF0',
          500: '#CFD3DB',
        },
        pink: {
          100: '#FEEBEF',
          400: '#FDD3DD',
          700: '#F9AABC',
          900: '#EA7590',
        },
        orange: {
          100: '#FEF3EB',
          400: '#FEE3D2',
          700: '#FFD0B3',
          900: '#F7995F',
        },
        yellow: {
          100: '#FEF9E6',
          400: '#FDEDAF',
          700: '#FBE598',
          900: '#F6C955',
        },
        green: {
          100: '#E6F9E8',
          400: '#A2ECA8',
          700: '#81E489',
          900: '#42C24D',
        },
        blue: {
          100: '#E3F3FC',
          400: '#B7E2FA',
          700: '#90D3F9',
          900: '#439ACB',
        },
        purple: {
          100: '#F1EBFE',
          400: '#DBCEF8',
          700: '#CAB5F8',
          900: '#9B7BE0',
        },
        failure: '#F65555', // error text, borders
      },
    },
  },
  plugins: [],
  important: '#root',
}
