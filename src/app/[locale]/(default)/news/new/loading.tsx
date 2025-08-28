import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ArticleFormSkeleton } from '@/components/news/ArticleFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function NewArticleLoading() {
  const t = await getTranslations('news');

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href='/news'
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToNews')}</span>
        </Link>
        <h1>{t('newArticle')}</h1>
      </div>
      <div className='mx-auto lg:max-w-2xl'>
        <ArticleFormSkeleton />
      </div>
    </>
  );
}
