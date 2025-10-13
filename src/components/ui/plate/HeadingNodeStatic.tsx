import { cva, type VariantProps } from 'cva';
import type { SlateElementProps } from 'platejs';
import { SlateElement } from 'platejs';
import type * as React from 'react';

const headingVariants = cva({
  base: 'relative mb-1',
  variants: {
    variant: {
      h1: 'mt-[1.6em] pb-1 font-bold font-heading text-4xl',
      h2: 'mt-[1.4em] pb-px font-heading font-semibold text-2xl tracking-tight',
      h3: 'mt-[1em] pb-px font-heading font-semibold text-xl tracking-tight',
      h4: 'mt-[0.75em] font-heading font-semibold text-lg tracking-tight',
      h5: 'mt-[0.75em] font-semibold text-lg tracking-tight',
      h6: 'mt-[0.75em] font-semibold text-base tracking-tight',
    },
  },
});

function HeadingElementStatic({
  variant = 'h1',
  ...props
}: SlateElementProps & VariantProps<typeof headingVariants>) {
  return (
    <SlateElement
      as={variant}
      className={headingVariants({ variant })}
      {...props}
    >
      {props.children}
    </SlateElement>
  );
}

function H1ElementStatic(props: SlateElementProps) {
  return <HeadingElementStatic variant='h1' {...props} />;
}

function H2ElementStatic(
  props: React.ComponentProps<typeof HeadingElementStatic>,
) {
  return <HeadingElementStatic variant='h2' {...props} />;
}

function H3ElementStatic(
  props: React.ComponentProps<typeof HeadingElementStatic>,
) {
  return <HeadingElementStatic variant='h3' {...props} />;
}

function H4ElementStatic(
  props: React.ComponentProps<typeof HeadingElementStatic>,
) {
  return <HeadingElementStatic variant='h4' {...props} />;
}

function H5ElementStatic(
  props: React.ComponentProps<typeof HeadingElementStatic>,
) {
  return <HeadingElementStatic variant='h5' {...props} />;
}

function H6ElementStatic(
  props: React.ComponentProps<typeof HeadingElementStatic>,
) {
  return <HeadingElementStatic variant='h6' {...props} />;
}

export {
  HeadingElementStatic,
  H1ElementStatic,
  H2ElementStatic,
  H3ElementStatic,
  H4ElementStatic,
  H5ElementStatic,
  H6ElementStatic,
};
