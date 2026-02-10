import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { RuleForm } from '@/components/rules/RuleForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('rules.update');

  return {
    title: t('title'),
  };
}

export default async function EditRulePage({
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
    return notFound();
  }

  const { user } = await api.auth.state();
  const t = await getTranslations('rules');

  if (
    !user?.groups.some((g) => ['labops', 'management', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('update.unauthorized')} />;
  }

  const rule = await api.rules.fetchRule(processedSubsetId);

  if (!rule) {
    return notFound();
  }

  const { about, rules, ui, error } = await getMessages();

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href={{
            pathname: '/rules/[subsetId]',
            params: { subsetId: rule.id },
          }}
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToRules')}</span>
        </Link>
        <h1>{t('update.title')}</h1>
      </div>
      <NextIntlClientProvider
        messages={
          { about, rules, ui, error } as Pick<
            Messages,
            'about' | 'rules' | 'ui' | 'error'
          >
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <RuleForm rule={rule} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
