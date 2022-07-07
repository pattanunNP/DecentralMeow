// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {

        xs: '375px',
        sm: '425px',
        md: '700px',
        lg: '976px',
        xl: '1440px',
        xxl: '1920px',
        xxxl: '2560px',

      },
      colors: {
        'violet-dark': 'rgba(99, 88, 238, 1)',
        'violet-light': ' rgba(150, 93, 233, 1)',
      },
      fontFamily: {
        Prompt: ['Prompt'],
        Kanit: "'kanit', sans-serif"
      },
    },
  },
  plugins: [],
}
