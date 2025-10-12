import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { HackerspaceLogo } from '@/components/assets/logos';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function ArticleLoading() {
  const t = await getTranslations('news');

  return (
    <article>
      <header>
        <Link
          className='mb-4 flex w-fit items-center gap-2'
          href='/news'
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span>{t('backToNews')}</span>
        </Link>
        <div className='mb-10 flex justify-center'>
          <div className='flex h-96 w-full max-w-4xl items-center justify-center rounded-lg bg-muted'>
            <HackerspaceLogo className='h-32 w-32' />
          </div>
        </div>
        <div className='my-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='w-full space-y-2'>
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-5 w-1/3' />
          </div>
        </div>
      </header>
      <section className='mb-6 space-y-4'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='flex flex-col'>
            <Skeleton className='h-6 w-32' />
            <small className='my-1 flex text-foreground/60'>
              <Skeleton className='h-5 w-20' />
              &nbsp;&nbsp;•&nbsp;&nbsp;
              <Skeleton className='h-5 w-18' />
            </small>
            <small>
              <Skeleton className='h-5 w-42' />
            </small>
          </div>
        </div>
        <Skeleton className='h-5 w-20 bg-secondary' />
      </section>
      <Skeleton className='h-96 w-full' />
    </article>
  );
}
