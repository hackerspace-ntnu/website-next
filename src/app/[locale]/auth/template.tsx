'use client';

import { type HTMLMotionProps, m } from 'framer-motion';

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <m.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: '0%', opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.5 }}
      {...({ className: 'flex h-full flex-col p-6' } as HTMLMotionProps<'div'>)}
    >
      {children}
    </m.div>
  );
}
