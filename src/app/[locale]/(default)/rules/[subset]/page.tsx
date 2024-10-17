import { rulesMockdata } from '@/mock-data/rules';

export default function SubPage({
  params: { subset },
}: { params: { subset: string } }) {
  const page = rulesMockdata.find(
    (rule) => rule.id === Number.parseInt(subset),
  );
  if (!page) return null;
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>{page.title}</h1>
    </div>
  );
}
