'use client';

import { createContext, useContext, useState } from 'react';
import { ResponsiveDialog } from '../composites/ResponsiveDialog';

type ResponsiveDialogContext = {
  closeDialog: () => void;
};

const ResponsiveDialogContext = createContext<ResponsiveDialogContext>({
  closeDialog: () => {},
});

function useResponsiveDialog() {
  return useContext(ResponsiveDialogContext);
}

type ResponsiveDialogWrapperProps = {
  children: React.ReactNode;
};

function ResponsiveDialogWrapper({ children }: ResponsiveDialogWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ResponsiveDialogContext.Provider
      value={{ closeDialog: () => setIsOpen(false) }}
    >
      <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </ResponsiveDialog>
    </ResponsiveDialogContext.Provider>
  );
}

export { ResponsiveDialogWrapper, useResponsiveDialog };
