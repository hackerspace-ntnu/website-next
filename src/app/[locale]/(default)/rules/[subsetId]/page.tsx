import { TRPCError } from '@trpc/server';
import { ArrowLeftIcon, EditIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { Link } from '@/components/ui/Link';
import { PlateEditorView } from '@/components/ui/plate/PlateEditorView';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; subsetId: string }>;
}) {
  const { subsetId } = await params;

  const processedSubsetId = Number(subsetId);
  if (
    Number.isNaN(processedSubsetId) ||
    !Number.isInteger(processedSubsetId) ||
    processedSubsetId < 1
  ) {
    return;
  }

  let rule: RouterOutput['rules']['fetchRule'] | null = null;
  try {
    rule = await api.rules.fetchRule(processedSubsetId);
  } catch {
    return;
  }

  if (!rule || !rule.localization) return;

  return {
    title: rule.localization.name,
  };
}

export default async function RuleSubsetPage({
  params,
}: {
  params: Promise<{ locale: string; subsetId: string }>;
}) {
  const { locale, subsetId } = await params;
  setRequestLocale(locale as Locale);

  const processedSubsetId = Number(subsetId);
  if (
    Number.isNaN(processedSubsetId) ||
    !Number.isInteger(processedSubsetId) ||
    processedSubsetId < 1
  ) {
    return;
  }

  const t = await getTranslations('rules');

  let rule: RouterOutput['rules']['fetchRule'] | null = null;
  try {
    rule = await api.rules.fetchRule(processedSubsetId);
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code === 'FORBIDDEN') {
        return <ErrorPageContent message={t('api.unauthorizedInternalRule')} />;
      }
      console.error(error);
    }
  }

  if (!rule || !rule.localization) return notFound();

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
          ['labops', 'management', 'admin'].includes(g),
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
      <PlateEditorView value={rule.localization.content} />
    </>
  );
}
