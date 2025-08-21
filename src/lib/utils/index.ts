import { defineConfig, type VariantProps } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';
import { withClamp } from 'tw-clamp-css/dynamic/merge';

const twMerge = extendTailwindMerge(withClamp);

const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
});

export { cva, cx, compose, type VariantProps };
