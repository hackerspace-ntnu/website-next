import { rulesMockdata } from '@/mock-data/rules';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default function RuleSubSetPage({
  params: { subset },
}: { params: { subset: string } }) {
  unstable_setRequestLocale(subset);
  const page = rulesMockdata.find(
    (rule) => rule.id === Number.parseInt(subset),
  );
  if (!page) return notFound();
  return <h1 className='text-center'>{page.title}</h1>;
}
