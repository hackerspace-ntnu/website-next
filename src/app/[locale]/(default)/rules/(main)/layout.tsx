import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type RulesLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function RulesLayout({
  children,
  params: { locale },
}: RulesLayoutProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('rules');
  return (
    <>
      <h1 className='text-center'>{t('title')}</h1>
      {children}
    </>
  );
}
