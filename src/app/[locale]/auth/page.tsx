import { FeideButton } from '@/components/auth/FeideButton';
import { ErrorToast } from '@/components/layout/ErrorToast';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';
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

  const { user } = await api.auth.state();

  if (user) {
    if (!user.isAccountComplete) {
      return redirect({ href: '/auth/create-account', locale });
    }
    return redirect({ href: '/', locale });
  }

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
        <Link
          className='flex w-full gap-1 bg-primary/80 font-montserrat font-semibold text-black text-md dark:bg-primary/50 dark:text-white hover:dark:bg-primary/40'
          variant='default'
          size='default'
          href='/auth/account'
        >
          <FingerprintIcon className='text-accent dark:text-primary' />
          {t('hackerspaceAccount')}
        </Link>
      </div>
      <ErrorToast error={error} cleanPath='/auth' />
    </div>
  );
}
