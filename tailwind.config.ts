import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#046307',
        darkprim: '#023B04',
        lightGrey: '#909090',
      },
    },
    screens: {
      sm: {'max': '480px'},
      md: '768px',
      lg: '976px',
      big: '1800px',
      laptop: {'max': '1535px'},
    },
  },
  plugins: [],
} satisfies Config;