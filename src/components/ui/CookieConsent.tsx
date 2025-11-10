'use client';

import { CookieIcon } from 'lucide-react';
import { AnimatePresence, type HTMLMotionProps, m } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';

type CookieConsentProps = HTMLMotionProps<'div'> & {
  t: {
    description: React.ReactNode;
    accept: React.ReactNode;
    decline: React.ReactNode;
  };
  variant?: 'default' | 'small' | 'mini';
  demo?: boolean;
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
  learnMoreHref?: string;
};

function CookieConsent({
  variant = 'default',
  demo = false,
  onAcceptCallback,
  onDeclineCallback,
  className,
  t,
  learnMoreHref = '#',
  ref,
  ...props
}: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optedOut, setOptedOut, isLoading] = useLocalStorage<
    boolean | undefined
  >('opted-out', undefined);

  const handleAccept = useCallback(() => {
    setIsOpen(false);
    setOptedOut(false);
    onAcceptCallback?.();
  }, [onAcceptCallback, setOptedOut]);

  const handleDecline = useCallback(() => {
    setIsOpen(false);
    setOptedOut(true);
    onDeclineCallback?.();
  }, [onDeclineCallback, setOptedOut]);

  useEffect(() => {
    if (isLoading) return;
    try {
      if (optedOut === undefined) {
        setIsOpen(true);
      } else if (optedOut !== undefined && !demo) {
        setIsOpen(false);
      }
    } catch (error) {
      console.warn('Cookie consent error:', error);
    }
  }, [demo, optedOut, isLoading]);

  const commonWrapperProps = {
    ref,
    className: cx(
      'fixed z-50',
      variant === 'mini'
        ? 'right-0 bottom-4 left-0 w-full sm:left-4 sm:max-w-3xl'
        : 'right-0 bottom-0 left-0 w-full sm:bottom-4 sm:left-4 sm:max-w-md',
      className,
    ),
    initial: { y: 32, opacity: 0, scale: 0.98 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: 32, opacity: 0, scale: 0.98 },
    transition: { duration: 0.2, ease: 'easeOut' },
    ...props,
  };

  if (variant === 'default') {
    return (
      <AnimatePresence>
        {isOpen && (
          <m.div {...commonWrapperProps}>
            <Card className='m-3 shadow-lg'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-lg'>We use cookies</CardTitle>
                <CookieIcon className='h-5 w-5' />
              </CardHeader>
              <CardContent className='space-y-2'>
                <CardDescription className='text-sm'>
                  {t.description}
                </CardDescription>
              </CardContent>
              <CardFooter className='flex gap-2 pt-2'>
                <Button
                  onClick={handleDecline}
                  variant='secondary'
                  className='flex-1'
                >
                  {t.decline}
                </Button>
                <Button onClick={handleAccept} className='flex-1'>
                  {t.accept}
                </Button>
              </CardFooter>
            </Card>
          </m.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === 'small') {
    return (
      <AnimatePresence>
        {isOpen && (
          <m.div {...commonWrapperProps}>
            <Card className='m-3 shadow-lg'>
              <CardHeader className='flex h-0 flex-row items-center justify-between space-y-0 px-4 pb-2'>
                <CardTitle className='text-base'>We use cookies</CardTitle>
                <CookieIcon className='h-4 w-4' />
              </CardHeader>
              <CardContent className='px-4 pt-0 pb-2'>
                <CardDescription className='text-sm'>
                  {t.description}
                </CardDescription>
              </CardContent>
              <CardFooter className='flex h-0 gap-2 px-4 py-2'>
                <Button
                  onClick={handleDecline}
                  variant='secondary'
                  size='sm'
                  className='flex-1 rounded-full'
                >
                  {t.decline}
                </Button>
                <Button
                  onClick={handleAccept}
                  size='sm'
                  className='flex-1 rounded-full'
                >
                  {t.accept}
                </Button>
              </CardFooter>
            </Card>
          </m.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === 'mini') {
    return (
      <AnimatePresence>
        {isOpen && (
          <m.div {...commonWrapperProps}>
            <Card className='mx-3 p-0 py-3 shadow-lg'>
              <CardContent className='grid gap-4 p-0 px-3.5 sm:flex'>
                <CardDescription className='flex-1 text-xs sm:text-sm'>
                  {t.description}
                </CardDescription>
                <div className='flex items-center justify-end gap-2 sm:gap-3'>
                  <Button
                    onClick={handleDecline}
                    size='sm'
                    variant='secondary'
                    className='h-7 text-xs'
                  >
                    {t.decline}
                    <span className='sr-only sm:hidden'>{t.decline}</span>
                  </Button>
                  <Button
                    onClick={handleAccept}
                    size='sm'
                    className='h-7 text-xs'
                  >
                    {t.accept}
                    <span className='sr-only sm:hidden'>{t.accept}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </AnimatePresence>
    );
  }

  return null;
}

CookieConsent.displayName = 'CookieConsent';
export { CookieConsent };
