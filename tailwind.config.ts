import tailwindScrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  theme: {
    extend: {
      gridTemplateColumns: {
        '3-auto': 'repeat(3, auto)',
        '2-auto': 'repeat(2, auto)',
      },
    },
  },
  plugins: [tailwindAnimate, tailwindScrollbarHide],
};

export default config;
