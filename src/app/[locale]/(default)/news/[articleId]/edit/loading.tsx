import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ArticleFormSkeleton } from '@/components/news/ArticleFormSkeleton';
import { Button } from '@/components/ui/Button';

export default async function EditArticleLoading() {
  const t = await getTranslations('news');

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Button
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          variant='ghost'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToArticle')}</span>
        </Button>
        <h1>{t('updateArticle')}</h1>
      </div>
      <div className='mx-auto lg:max-w-2xl'>
        <ArticleFormSkeleton />
      </div>
    </>
  );
}
