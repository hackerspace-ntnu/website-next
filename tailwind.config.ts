import tailwindFluid, { extract } from 'fluid-tailwind';
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: {
    files: ['./src/**/*.tsx'],
    // extract,
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        '3-auto': 'repeat(3, auto)',
        '2-auto': 'repeat(2, auto)',
      },
    },
  },
  plugins: [tailwindFluid, tailwindAnimate, tailwindScrollbarHide],
};

export default config;
