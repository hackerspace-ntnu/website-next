import { FeideLogo } from '@/components/assets/logos/FeideLogo';
import { LogoLink } from '@/components/layout/LogoLink';
import { Button } from '@/components/ui/Button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { FingerprintIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('signIn'),
  };
}

export default function SignInPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('signIn');
  return (
    <>
      <CardHeader>
        <LogoLink
          className='mx-16 mb-5'
          logoClassName='md:size-6 xl:size-6'
          titleClassName='md:text-md xl:text-md'
        />
        <CardTitle className='text-center'>{t('welcome')}</CardTitle>
        <CardDescription className='text-center'>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4'>
        <div className='w-full'>
          <Separator />
          <p className='text-center font-montserrat'>{t('signInWith')}</p>
        </div>
        <Button className='w-full bg-[#3FACC2]/90 hover:bg-[#3FACC2] dark:bg-[#222832] hover:dark:bg-[#222832]/90'>
          <FeideLogo title='Feide' />
        </Button>
        <Button className='flex w-full gap-1 bg-primary/80 font-montserrat font-semibold text-black text-md dark:bg-primary/50 dark:text-white hover:dark:bg-primary/40'>
          <FingerprintIcon className='text-accent dark:text-primary' />
          {t('hackerspaceAccount')}
        </Button>
      </CardContent>
    </>
  );
}
