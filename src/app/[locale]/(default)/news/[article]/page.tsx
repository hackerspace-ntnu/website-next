import {
  articleMockData as articleData,
  authorMockData as authorData,
} from '@/mock-data/article';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import readingTime from 'reading-time';

import { AvatarIcon } from '@/components/profile/AvatarIcon';
import { Badge } from '@/components/ui/Badge';

// export async function generateStaticParams() {
//   return articleData.map((article) => ({
//     article: String(article.id),
//   }));
// }

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

export default function ArticlePage({
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

  const { minutes } = readingTime(article.content as string); // assert because its a mock data file
  const author = authorData[0] as {
    name: string;
    photoUrl: string;
    initials: string;
  }; // same as above
  return (
    <article>
      <header>
        <div className='mt-5 mb-10 flex justify-center'>
          <Image
            className='h-auto w-full max-w-4xl rounded-lg'
            src={`/${article.photoUrl}`}
            alt={article.title}
            width={1600}
            height={900}
            priority
          />
        </div>
        <h2 className='my-4'>{article.title}</h2>
      </header>
      <section className='mb-6 space-y-4'>
        <div className='flex items-center gap-4'>
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
        </div>
        <Badge variant='secondary'>{`${article.views} ${t('views')}`}</Badge>
      </section>
      <section className='my-6'>{article.content}</section>
    </article>
  );
}
