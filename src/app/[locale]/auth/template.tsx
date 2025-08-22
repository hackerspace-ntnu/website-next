'use client';

import { m } from 'motion/react';

export default function AuthTemplate({
  children,
}: LayoutProps<'/[locale]/auth'>) {
  return (
    <m.div
      className='flex h-full flex-col p-6'
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: '0%', opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.5 }}
    >
      {children}
    </m.div>
  );
}
