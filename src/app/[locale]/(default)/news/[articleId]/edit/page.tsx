import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ArticleForm } from '@/components/news/ArticleForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('news');

  return {
    title: `${t('editArticle')}`,
  };
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; articleId: string }>;
}) {
  const { locale, articleId } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('news');
  const { about, news, ui } = await getMessages();

  if (Number.isNaN(Number(articleId))) return notFound();

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('editArticlesUnauthorized'));
  }

  const article = await api.news.fetchArticle(Number(articleId));

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
        <h1>{t('editArticle')}</h1>
      </div>
      <NextIntlClientProvider
        messages={
          { about, news, ui } as Pick<Messages, 'about' | 'news' | 'ui'>
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <ArticleForm article={article} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
