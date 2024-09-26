import { LogoLink } from '@/components/layout/LogoLink';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('login'),
  };
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('login');
  return (
    <>
      <CardHeader>
        <LogoLink
          className='mb-4'
          logoClassName='md:size-6 xl:size-6'
          titleClassName='md:text-md xl:text-md'
        />
        <CardTitle className='text-center'>{t('welcome')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <Separator />
    </>
  );
}
