'use client';

import { m } from 'motion/react';
import { createContext, useContext, useEffect, useState } from 'react';

type PendingContextType = {
  isPending: boolean;
  setPending: (pending: boolean) => void;
};

const PendingContext = createContext<PendingContextType | undefined>(undefined);

type PendingProviderProps = {
  children: React.ReactNode;
};

function PendingProvider({ children }: PendingProviderProps) {
  const [isPending, setPending] = useState(false);

  return (
    <PendingContext.Provider value={{ isPending, setPending }}>
      {children}
    </PendingContext.Provider>
  );
}

const usePending = () => {
  const context = useContext(PendingContext);
  if (!context) {
    throw new Error('usePending must be used within a PendingProvider');
  }
  return context;
};

function PendingBar() {
  const { isPending } = usePending();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isPending) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isPending]);

  if (!visible) return null;

  return (
    <div
      className={`-top-1 absolute left-0 h-2 w-full transition-opacity duration-300 ${
        isPending ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <m.div
        className='h-2 w-1/3 rounded-sm bg-primary/80'
        animate={{ x: ['-100%', '300%'] }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
}

export { PendingBar, PendingProvider, usePending };
