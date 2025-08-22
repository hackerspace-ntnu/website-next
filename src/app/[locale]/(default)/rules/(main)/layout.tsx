import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function RulesLayout({
  children,
  params,
}: LayoutProps<'/[locale]/rules'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('rules');

  return (
    <>
      <h1 className='text-center'>{t('title')}</h1>
      {children}
    </>
  );
}
