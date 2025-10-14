import { ArrowLeftIcon } from 'lucide-react';
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
    title: `${t('newArticle')}`,
  };
}

export default async function NewArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('news');
  const { news, ui, error } = await getMessages();

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('newArticlesUnauthorized')} />;
  }

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
      <NextIntlClientProvider
        messages={
          { news, ui, error } as Pick<Messages, 'news' | 'ui' | 'error'>
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <ArticleForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
