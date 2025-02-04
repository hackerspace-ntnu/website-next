import { withFluid } from '@fluid-tailwind/tailwind-merge';
import { type VariantProps, defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge(withFluid);

const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
});

export { cva, cx, compose, type VariantProps };
