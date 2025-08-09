import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { QuoteFormSkeleton } from '@/components/quotes/QuoteFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function NewQuoteLoading() {
  const t = await getTranslations('quotes');
  const tUpdate = await getTranslations('quotes.update');

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/quotes'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{t('backToQuotes')}</span>
      </Link>
      <h1 className='text-center'>{tUpdate('title')}</h1>
      <QuoteFormSkeleton />
    </>
  );
}
