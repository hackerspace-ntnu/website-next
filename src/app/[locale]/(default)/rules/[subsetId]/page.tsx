import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function RuleSubSetPage({
  params,
}: {
  params: Promise<{ locale: Locale; subsetId: string }>;
}) {
  const { locale, subsetId } = await params;
  setRequestLocale(locale);

  if (Number.isNaN(Number(subsetId))) return notFound();

  const rule = await api.rules.fetchRule(Number(subsetId));

  if (!rule) return notFound();

  const t = await getTranslations('rules');

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
      <h1 className='text-center'>
        {locale === 'en-GB' ? rule.nameEnglish : rule.nameNorwegian}
      </h1>
      <p className='my-4'>
        {locale === 'en-GB' ? rule.contentEnglish : rule.contentNorwegian}
      </p>
    </>
  );
}
