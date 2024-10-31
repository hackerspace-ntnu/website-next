'use client';

import { m } from 'framer-motion';

export default function DefaultTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.5 }}
    >
      {children}
    </m.div>
  );
}
