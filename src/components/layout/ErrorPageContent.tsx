'use client';

import { AlertTriangleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Main } from '@/components/layout/Main';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';

/**
 * The content of the Error Page.
 * When used to display a custom error message, provide the `message` prop only.
 *
 * When used to display an uncaught exception (in error.tsx), the `error` and `reset` props must be provided.
 * Do not provide the `message` prop in this case.
 */
function ErrorPageContent({
  error,
  reset,
  message,
}: {
  error?: Error;
  reset?: () => void;
  message?: string;
}) {
  const t = useTranslations('error');

  const Wrapper = message ? 'div' : Main;

  return (
    <Wrapper
      className={cx(
        'flex flex-col items-center justify-center text-center',
        message && 'min-h-[75vh]',
        !message && 'min-h-svh',
      )}
    >
      <AlertTriangleIcon className='mb-6 xs:mb-8 h-16 xs:h-24 w-16 xs:w-24 text-destructive' />
      <h1 className='mb-3 xs:mb-4'>{t('error')}</h1>
      <p className='mb-4 text-lg text-muted-foreground xs:text-xl'>
        {t('errorDescription')}
      </p>
      {(error?.message || message) && (
        <p className='mb-6 rounded-md bg-muted p-2 text-sm xs:text-base'>
          Error: {error?.message ?? message}
        </p>
      )}
      <div className='flex w-full xs:w-auto xs:flex-row flex-col xs:space-x-4 space-y-4 xs:space-y-0'>
        <Button onClick={reset} variant='outline' className='w-full xs:w-auto'>
          {t('tryAgain')}
        </Button>
        <Link
          className='w-full xs:w-auto'
          variant='default'
          size='default'
          href='/'
        >
          {t('goToHomepage')}
        </Link>
      </div>
    </Wrapper>
  );
}

export { ErrorPageContent };
