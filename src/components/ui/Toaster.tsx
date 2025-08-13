'use client';

import { useTheme } from 'next-themes';
import * as ToasterPrimitive from 'sonner';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

const toast = ToasterPrimitive.toast;

function Toaster({
  ...props
}: React.ComponentPropsWithRef<typeof ToasterPrimitive.Toaster>) {
  const { theme = 'system' } = useTheme();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <ToasterPrimitive.Toaster
      theme={theme as ToasterPrimitive.ToasterProps['theme']}
      className='toaster group'
      position={isDesktop ? 'bottom-right' : 'top-center'}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
