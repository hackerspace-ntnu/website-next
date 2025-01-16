import { FeideButton } from '@/components/auth/FeideButton';
import { ErrorToast } from '@/components/layout/ErrorToast';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Link } from '@/lib/locale/navigation';
import { FingerprintIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  let { error } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('auth');

  // @ts-expect-error: Unknown if error is a valid translation key
  error = t.has(`error.${error}`) ? t(`error.${error}`) : undefined;

  return (
    <div className='relative flex h-full flex-col transition-opacity duration-500'>
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('welcome')}</h1>
        <p className='text-sm'>{t('description')}</p>
      </div>
      <Separator />
      <div className='absolute bottom-0 left-0 w-full space-y-4'>
        <p className='text-center font-montserrat'>{t('signInWith')}</p>
        <FeideButton />
        <Button
          className='flex w-full gap-1 bg-primary/80 font-montserrat font-semibold text-black text-md dark:bg-primary/50 dark:text-white hover:dark:bg-primary/40'
          asChild
        >
          <Link href='/auth/account'>
            <FingerprintIcon className='text-accent dark:text-primary' />
            {t('hackerspaceAccount')}
          </Link>
        </Button>
      </div>
      <ErrorToast error={error} cleanPath='/auth' />
    </div>
  );
}
