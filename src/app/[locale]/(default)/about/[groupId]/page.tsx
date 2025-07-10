import {
  articleMockData as articleData,
  authorMockData as authorData,
} from '@/mock-data/article';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import readingTime from 'reading-time';

import { AvatarIcon } from '@/components/profile/AvatarIcon';
import { Badge } from '@/components/ui/Badge';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const data = articleData.find((a) => a.id === Number(article));

  return {
    title: data?.title,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; article: string }>;
}) {
  const { locale, article } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tNews = await getTranslations('news');

  const data = articleData.find((a) => a.id === Number(article));
  if (!data) {
    return notFound();
  }

  const { minutes } = readingTime(data.content as string); // assert because its a mock data file
  const author = authorData[0] as {
    name: string;
    photoUrl: string;
    initials: string;
  }; // same as above
  return (
    <article>
      <header>
        <div className='mb-10 flex justify-center'>
          <Image
            className='h-auto w-full max-w-4xl rounded-lg'
            src={`/${data.photoUrl}`}
            alt={data.title}
            width={1600}
            height={900}
            priority
          />
        </div>
        <h2 className='my-4'>{data.title}</h2>
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
              {tNews('readTime', { count: Math.ceil(minutes) })}
              &nbsp;&nbsp;•&nbsp;&nbsp;
              {data.date}
            </small>
          </div>
        </div>
        <Badge variant='secondary'>{`${data.views} ${tNews('views')}`}</Badge>
      </section>
      <section>{data.content}</section>
    </article>
  );
}
