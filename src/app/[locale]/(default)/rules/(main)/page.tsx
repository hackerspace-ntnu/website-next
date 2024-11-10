import { RuleCardList } from '@/components/rules/RuleCardList';
import { rulesMockdata } from '@/mock-data/rules';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

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
  return (
    <>
      <RuleCardList className='p4' rules={rulesMockdata} />
    </>
  );
}
