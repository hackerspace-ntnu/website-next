import {
  articleMockData as articleData,
  authorMockData as authorData,
} from '@/mock-data/article';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import readingTime from 'reading-time';

import { AvatarIcon } from '@/components/profile/AvatarIcon';

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
  const t = useTranslations('news');

  const article = articleData.find(
    (article) => article.id === Number(params.article),
  );
  if (!article) {
    return notFound();
  }

  const { minutes } = readingTime(article.content!);
  const author = authorData[0]!;
  return (
    <>
      <h2 className='first:my-4'>{article.title}</h2>
      <section className='flex items-center gap-4'>
        <AvatarIcon
          photoUrl={`/${author.photoUrl}`}
          name={author.name}
          initials={author.initials}
        />
        <div className='flex flex-col'>
          <p className='font-montserrat font-semibold'>{author.name}</p>
          <small className='text-foreground/60'>
            {t('readTime', { count: Math.ceil(minutes) })}
            &nbsp;&nbsp;•&nbsp;&nbsp;
            {article.date}
          </small>
        </div>
      </section>
      <p>{article.content}</p>
    </>
  );
}
