import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#046307',
        darkprim: '#023B04'
      },
    },
  },
  plugins: [],
} satisfies Config;