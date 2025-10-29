'use client';

import { CookieIcon } from 'lucide-react';
import { type JSX, useCallback, useEffect, useState } from 'react';
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

type CookieConsentProps = JSX.IntrinsicElements['div'] & {
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
  const [hide, setHide] = useState(false);
  const [optedOut, setOptedOut, isLoading] = useLocalStorage(
    'opted-out',
    false,
  );

  const handleAccept = useCallback(() => {
    setIsOpen(false);
    /* biome-ignore lint/suspicious/noDocumentCookie: CookieStore isn't supported everywhere yet. 
    There's also no need to install another library just to set the cookies client-side once. */
    document.cookie =
      'cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback?.();
  }, [onAcceptCallback]);

  const handleDecline = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    setOptedOut(true);
    onDeclineCallback?.();
  }, [onDeclineCallback, setOptedOut]);

  useEffect(() => {
    if (isLoading) return;
    try {
      setIsOpen(true);
      if (
        (document.cookie.includes('cookieConsent=true') || optedOut) &&
        !demo
      ) {
        setIsOpen(false);
        setTimeout(() => {
          setHide(true);
        }, 700);
      }
    } catch (error) {
      console.warn('Cookie consent error:', error);
    }
  }, [demo, optedOut, isLoading]);

  if (hide) return null;

  const containerClasses = cx(
    'fixed z-50 transition-all duration-700',
    !isOpen ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100',
    className,
  );

  const commonWrapperProps = {
    ref,
    className: cx(
      containerClasses,
      variant === 'mini'
        ? 'right-0 bottom-4 left-0 w-full sm:left-4 sm:max-w-3xl'
        : 'right-0 bottom-0 left-0 w-full sm:bottom-4 sm:left-4 sm:max-w-md',
    ),
    ...props,
  };

  if (variant === 'default') {
    return (
      <div {...commonWrapperProps}>
        <Card className='m-3 shadow-lg'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-lg'>We use cookies</CardTitle>
            <CookieIcon className='h-5 w-5' />
          </CardHeader>
          <CardContent className='space-y-2'>
            <CardDescription className='text-sm'>
              {t.description}
            </CardDescription>
            <p className='text-muted-foreground text-xs'>
              By clicking <span className='font-medium'>"Accept"</span>, you
              agree to our use of cookies.
            </p>
            <a
              href={learnMoreHref}
              className='text-primary text-xs underline underline-offset-4 hover:no-underline'
            >
              Learn more
            </a>
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
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div {...commonWrapperProps}>
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
      </div>
    );
  }

  if (variant === 'mini') {
    return (
      <div {...commonWrapperProps}>
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
              <Button onClick={handleAccept} size='sm' className='h-7 text-xs'>
                {t.accept}
                <span className='sr-only sm:hidden'>{t.accept}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

CookieConsent.displayName = 'CookieConsent';
export { CookieConsent };
