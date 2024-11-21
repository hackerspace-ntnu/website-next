import { RuleCard } from '@/components/rules/RuleCard';
import { cx } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type RuleCardListProps = {
  className?: string;
  rules: Array<{
    id: number;
    internal: boolean;
    title: string;
    photoUrl: string;
  }>;
};

function RuleCardList({ rules }: RuleCardListProps) {
  const internal = rules.filter((rule) => rule.internal);
  const notInternal = rules.filter((rule) => !rule.internal);
  const t = useTranslations('rules');
  const isMember = true;

  return (
    <div className='flex shrink flex-wrap justify-center p-4 md:flex-nowrap md:space-x-5'>
      <div className={isMember ? ' md:w-1/2' : 'md:full mt-5'}>
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

export { RuleCardList };
