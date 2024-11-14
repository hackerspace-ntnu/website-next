import { FeideLogo } from '@/components/assets/logos/FeideLogo';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Link } from '@/lib/locale/navigation';
import { FingerprintIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('auth');
  return (
    <div className='flex h-full flex-col transition-opacity duration-500'>
      <div className='mb-4 space-y-2 text-center'>
        <h1 className='text-4xl'>{t('welcome')}</h1>
        <p className='text-sm'>{t('description')}</p>
      </div>
      <Separator />
      <div className='absolute bottom-0 space-y-4'>
        <p className='text-center font-montserrat'>{t('signInWith')}</p>
        <Button className='w-full bg-[#3FACC2]/90 hover:bg-[#3FACC2] dark:bg-[#222832] hover:dark:bg-[#222832]/40'>
          <FeideLogo title='Feide' />
        </Button>
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
    </div>
  );
}
