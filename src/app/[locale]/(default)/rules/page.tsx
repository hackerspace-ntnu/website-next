import { RulesPagesList } from '@/components/rules/RulesPagesList';
import { rulesMockdata } from '@/mock-data/rules';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('rules'),
  };
}

export default function RulesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('rules');

  return (
    <>
      <div className='p-4 text-center'>
        <h1>{t('title')}</h1>
      </div>
      <div className='p-4'>
        <RulesPagesList rules={rulesMockdata} />
      </div>
    </>
  );
}
