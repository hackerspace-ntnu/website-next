import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { rulesMockdata } from '@/mock-data/rules';

export default async function RuleSubSetPage({
  params,
}: PageProps<'/[locale]/rules/[subsetId]'>) {
  const { locale, subsetId } = await params;
  setRequestLocale(locale as Locale);

  const page = rulesMockdata.find((rule) => rule.id === Number(subsetId));
  if (!page) return notFound();

  return <h1 className='text-center'>{page.title}</h1>;
}
