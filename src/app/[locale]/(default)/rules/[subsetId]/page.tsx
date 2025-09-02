import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { rulesMockdata } from '@/mock-data/rules';

export default async function RuleSubSetPage({
  params,
}: {
  params: Promise<{ locale: Locale; subsetId: string }>;
}) {
  const { locale, subsetId } = await params;
  setRequestLocale(locale);
  const page = rulesMockdata.find((rule) => rule.id === Number(subsetId));
  if (!page) return notFound();
  return <h1 className='text-center'>{page.title}</h1>;
}
