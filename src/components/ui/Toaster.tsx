'use client';

import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  LoaderIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
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
      icons={{
        success: <CircleCheckIcon />,
        info: <InfoIcon />,
        warning: <TriangleAlertIcon />,
        error: <CircleXIcon />,
        loading: <LoaderIcon />,
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
