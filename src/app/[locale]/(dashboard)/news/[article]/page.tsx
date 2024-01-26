import { articleMockData as articleData } from '@/mock-data/article';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return articleData.map((article) => ({
    article: String(article.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { article: string };
}) {
  const article = articleData.find(
    (article) => article.id === Number(params.article),
  );

  return {
    title: article?.title,
  };
}

export default function Article({
  params,
}: {
  params: { locale: string; article: string };
}) {
  unstable_setRequestLocale(params.locale);
  const article = articleData.find(
    (article) => article.id === Number(params.article),
  );
  if (!article) {
    return notFound();
  }
  return (
    <>
      <h2 className='first:my-4'>{article.title}</h2>
    </>
  );
}
