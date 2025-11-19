import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { ArticleForm } from '@/components/news/ArticleForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('news');

  return {
    title: `${t('updateArticle')}`,
  };
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ locale: string; articleId: string }>;
}) {
  const { locale, articleId } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('news');
  const { news, ui, error } = await getMessages();

  if (Number.isNaN(Number(articleId))) return notFound();

  if (!user || user.groups.length === 0) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('updateArticlesUnauthorized')} />;
  }

  const article = await api.news.fetchArticle({ id: Number(articleId) });

  if (!article) return notFound();

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href={{ pathname: '/news/[articleId]', params: { articleId } }}
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToArticle')}</span>
        </Link>
        <h1>{t('updateArticle')}</h1>
      </div>
      <NextIntlClientProvider
        messages={
          { news, ui, error } as Pick<Messages, 'news' | 'ui' | 'error'>
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <ArticleForm article={article} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
