import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type RulesLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function RulesLayout({
  children,
  params,
}: RulesLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('rules');
  return (
    <>
      <h1 className='text-center'>{t('title')}</h1>
      {children}
    </>
  );
}
