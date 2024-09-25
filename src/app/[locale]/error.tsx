'use client';

import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import { AlertTriangleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations('error');
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <AlertTriangleIcon className='mb-6 xs:mb-8 size-16 xs:size-24 text-destructive' />
      <h1 className='mb-3 xs:mb-4 font-bold text-3xl xs:text-4xl'>
        {t('error')}
      </h1>
      <p className='mb-4 text-lg text-muted-foreground xs:text-xl'>
        {t('errorDescription')}
      </p>
      {error.message && (
        <p className='mb-6 rounded-md bg-muted p-2 text-sm xs:text-base'>
          Error: {error.message}
        </p>
      )}
      <div className='flex w-full xs:w-auto xs:flex-row flex-col xs:space-x-4 space-y-4 xs:space-y-0'>
        <Button onClick={reset} variant='outline' className='w-full xs:w-auto'>
          {t('tryAgain')}
        </Button>
        <Button asChild className='w-full xs:w-auto'>
          <Link href='/'>{t('goToHomepage')}</Link>
        </Button>
      </div>
    </div>
  );
}
