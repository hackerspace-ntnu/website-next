import { SubPages } from '@/components/rules/SubPages';
import { useTranslations } from 'next-intl';

type RulesPagesListProps = {
  rules: Array<{
    id: number;
    internal: boolean;
    title: string;
    photoUrl: string;
  }>;
};

function RulesPagesList({ rules }: RulesPagesListProps) {
  const internal = rules.filter((rule) => rule.internal === true);
  const notInternal = rules.filter((rule) => rule.internal === false);
  const t = useTranslations('rules');

  return (
    <div className='flex flex-wrap xs:flex-wrap md:flex-nowrap md:space-x-5'>
      <div className='xs:w-full sm:w-full md:w-1/2'>
        <h2 className='text-center'>{t('forEveryone')}</h2>
        {notInternal.map((rule) => (
          <SubPages
            key={rule.id}
            id={rule.id}
            internal={rule.internal}
            title={rule.title}
            photoUrl={rule.photoUrl}
          />
        ))}
      </div>
      <div className='xs:w-full sm:w-full md:w-1/2'>
        <h2 className='text-center'>{t('internal')}</h2>
        {internal.map((rule) => (
          <SubPages
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

export { RulesPagesList };
