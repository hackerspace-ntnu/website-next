import { ArrowLeftIcon, EditIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; subsetId: string }>;
}) {
  const { subsetId } = await params;

  const processedSubsetId = Number(subsetId);
  if (
    Number.isNaN(processedSubsetId) ||
    !Number.isInteger(processedSubsetId) ||
    processedSubsetId < 1
  )
    return;

  const rule = await api.rules.fetchRule(processedSubsetId);

  if (!rule || !rule.localization) return;

  return {
    title: rule.localization.name,
  };
}

export default async function RuleSubsetPage({
  params,
}: {
  params: Promise<{ locale: Locale; subsetId: string }>;
}) {
  const { locale, subsetId } = await params;
  setRequestLocale(locale);

  const processedSubsetId = Number(subsetId);
  if (
    Number.isNaN(processedSubsetId) ||
    !Number.isInteger(processedSubsetId) ||
    processedSubsetId < 1
  )
    return;

  const rule = await api.rules.fetchRule(processedSubsetId);

  if (!rule || !rule.localization) return notFound();

  const t = await getTranslations('rules');
  const { user } = await api.auth.state();

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/rules'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{t('backToRules')}</span>
      </Link>
      <div className='relative'>
        <h1 className='text-center'>{rule.localization.name}</h1>
        {user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
        ) && (
          <Link
            className='-translate-y-1/2 absolute top-1/2 right-0'
            href={{
              pathname: '/rules/[subsetId]/edit',
              params: { subsetId: rule.id },
            }}
            variant='default'
            size='icon'
          >
            <EditIcon />
          </Link>
        )}
      </div>
      <p className='my-4'>{rule.localization.content}</p>
    </>
  );
}
