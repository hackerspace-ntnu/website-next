import { FingerprintIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FeideButton } from '@/components/auth/FeideButton';
import { ErrorToast } from '@/components/layout/ErrorToast';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import type { routing } from '@/lib/locale';
import { redirect } from '@/lib/locale/navigation';

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ r?: string; error?: string }>;
}) {
  const { locale } = await params;
  let { r: redirectTo, error } = await searchParams;

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
        <FeideButton redirectTo={redirectTo} />
        <Link
          className='flex w-full gap-1 bg-primary/80 font-montserrat font-semibold text-black text-md dark:bg-primary/50 dark:text-white hover:dark:bg-primary/40'
          variant='default'
          size='default'
          href={{ pathname: '/auth/account', query: { r: redirectTo } }}
        >
          <FingerprintIcon className='text-accent dark:text-primary' />
          {t('hackerspaceAccount')}
        </Link>
      </div>
      <ErrorToast
        error={error}
        cleanPath={redirectTo ? `/auth?r=${redirectTo}` : '/auth'}
      />
    </div>
  );
}
