'use client';

import { cva, type VariantProps } from 'cva';
import type { PlateElementProps } from 'platejs/react';
import { PlateElement } from 'platejs/react';

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

function HeadingElement({
  variant = 'h1',
  ...props
}: PlateElementProps & VariantProps<typeof headingVariants>) {
  return (
    <PlateElement
      as={variant}
      className={headingVariants({ variant })}
      {...props}
    >
      {props.children}
    </PlateElement>
  );
}

function H1Element(props: PlateElementProps) {
  return <HeadingElement variant='h1' {...props} />;
}

function H2Element(props: PlateElementProps) {
  return <HeadingElement variant='h2' {...props} />;
}

function H3Element(props: PlateElementProps) {
  return <HeadingElement variant='h3' {...props} />;
}

function H4Element(props: PlateElementProps) {
  return <HeadingElement variant='h4' {...props} />;
}

function H5Element(props: PlateElementProps) {
  return <HeadingElement variant='h5' {...props} />;
}

function H6Element(props: PlateElementProps) {
  return <HeadingElement variant='h6' {...props} />;
}

export {
  HeadingElement,
  H1Element,
  H2Element,
  H3Element,
  H4Element,
  H5Element,
  H6Element,
};
