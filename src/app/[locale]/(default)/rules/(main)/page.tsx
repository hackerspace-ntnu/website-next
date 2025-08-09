import { PlusIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RuleCard } from '@/components/rules/RuleCard';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'layout' });

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

  const t = await getTranslations('rules');

  const rules = await api.rules.fetchRules();
  const { user } = await api.auth.state();
  const isMember = user?.groups && user.groups.length > 0;

  return (
    <>
      <div className='relative'>
        <h1 className='text-center'>{t('title')}</h1>
        {user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
        ) && (
          <Link
            className='-translate-y-1/2 absolute top-1/2 right-0'
            href='/rules/new'
            variant='default'
            size='icon'
          >
            <PlusIcon />
          </Link>
        )}
      </div>
      <div className='flex shrink flex-wrap justify-center p-4 md:flex-nowrap md:space-x-5'>
        <div className='mt-2 w-full md:size-full md:w-1/2'>
          {isMember && (
            <h2 className='border-b-0 p-4 text-center'>{t('publicRules')}</h2>
          )}
          {rules
            .filter((rule) => !rule.internal)
            .map((rule) => (
              <RuleCard
                className='mx-auto mb-3 flex max-w-2xl'
                key={rule.id}
                rule={rule}
              />
            ))}
        </div>
        {isMember && (
          <div className='mt-2 w-full md:w-1/2'>
            <h2 className='border-b-0 p-4 text-center'>{t('internalRules')}</h2>
            {rules
              .filter((rule) => rule.internal)
              .map((rule) => (
                <RuleCard
                  className='mb-3 flex max-w-2xl'
                  key={rule.id}
                  rule={rule}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
