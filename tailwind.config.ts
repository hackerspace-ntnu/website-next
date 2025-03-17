import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      gridTemplateColumns: {
        '3-auto': 'repeat(3, auto)',
        '2-auto': 'repeat(2, auto)',
      },
    },
  },
};

export default config;
