import { rulesMockdata } from '@/mock-data/rules';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function RuleSubSetPage({
  params,
}: {
  params: Promise<{ locale: string; subset: string }>;
}) {
  const { locale, subset } = await params;
  setRequestLocale(locale);
  const page = rulesMockdata.find(
    (rule) => rule.id === Number.parseInt(subset),
  );
  if (!page) return notFound();
  return <h1 className='text-center'>{page.title}</h1>;
}
