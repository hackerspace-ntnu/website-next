'use client';

import { AnimatePresence, m } from 'motion/react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { useContext, useRef } from 'react';

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

function AnimatePresenceProvider({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const key = usePathname();

  return (
    <AnimatePresence>
      <m.div key={key} className={className}>
        <FrozenRouter>{children}</FrozenRouter>
      </m.div>
    </AnimatePresence>
  );
}

export { AnimatePresenceProvider };
