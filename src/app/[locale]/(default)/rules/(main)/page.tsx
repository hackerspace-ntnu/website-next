import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RuleCard } from '@/components/rules/RuleCard';
import { rulesMockdata as rules } from '@/mock-data/rules';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('rules'),
  };
}

export default async function RulesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const internal = rules.filter((rule) => rule.internal);
  const notInternal = rules.filter((rule) => !rule.internal);
  const t = await getTranslations('rules');
  const isMember = true;

  return (
    <div className='flex shrink flex-wrap justify-center p-4 md:flex-nowrap md:space-x-5'>
      <div className={isMember ? ' md:w-1/2' : 'mt-2 md:size-full'}>
        <h2 className={isMember ? 'border-b-0 p-4 text-center' : 'hidden'}>
          {t('forEveryone')}
        </h2>
        {notInternal.map((rule) => (
          <RuleCard
            className='mx-auto mb-3 flex max-w-2xl'
            key={rule.id}
            id={rule.id}
            internal={rule.internal}
            title={rule.title}
            photoUrl={rule.photoUrl}
          />
        ))}
      </div>
      <div className={isMember ? 'w-full md:w-1/2' : 'hidden'}>
        <h2 className='border-b-0 p-4 text-center'>{t('internal')}</h2>
        {internal.map((rule) => (
          <RuleCard
            className='mb-3 flex h-16 max-w-2xl'
            key={rule.id}
            id={rule.id}
            internal={rule.internal}
            title={rule.title}
            photoUrl={rule.photoUrl}
          />
        ))}
      </div>
    </div>
  );
}
