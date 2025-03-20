import { SuccessParticles } from '@/components/auth/SuccessParticles';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('auth');

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale });
  }

  if (!user.isAccountComplete) {
    return redirect({ href: '/auth/create-account', locale });
  }

  return (
    <div className='relative flex h-full flex-col transition-opacity duration-500'>
      <div className='mb-4 space-y-2 text-center'>
        <h1>{t('success')}</h1>
        <p className='text-sm'>{t('successDescription')}</p>
      </div>
      <Separator />
      <div className='absolute bottom-0 flex w-full justify-center space-y-4'>
        <Link className='min-w-28' variant='default' size='default' href='/'>
          {t('home')}
        </Link>
      </div>
      <SuccessParticles />
    </div>
  );
}
