import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HackerspaceLogo } from '@/components/assets/logos';
import { AnimatedGradientText } from '@/components/fancy/AnimatedGradientText';
import { GridBackground } from '@/components/fancy/GridBackground';
import { Link } from '@/components/ui/Link';

export async function generateMetadata() {
  const t = await getTranslations('applications.thankYou');

  return {
    title: t('title'),
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('applications.thankYou');

  return (
    <GridBackground>
      <div className='flex min-h-96 max-w-prose flex-col gap-12 px-2 text-center'>
        <AnimatedGradientText className='mx-auto w-fit'>
          <h1 className='text-5xl leading-24 md:text-7xl'>{t('title')}</h1>
        </AnimatedGradientText>
        <h2 className='text-3xl leading-18 md:text-5xl'>{t('description1')}</h2>
        <h3 className='text-xl md:text-3xl'>{t('description2')}</h3>
        <HackerspaceLogo className='mx-auto h-32 w-32 rounded-lg p-2' />
        <Link
          href='/'
          variant='default'
          size='default'
          className='mx-auto w-48'
        >
          {t('backToHome')}
        </Link>
      </div>
    </GridBackground>
  );
}
