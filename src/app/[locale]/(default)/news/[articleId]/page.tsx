import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import readingTime from 'reading-time';
import { HackerspaceLogo } from '@/components/assets/logos';
import { AvatarIcon } from '@/components/profile/AvatarIcon';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import { getFileUrl } from '@/server/services/files';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; articleId: string }>;
}) {
  const { locale, articleId } = await params;
  const article = await api.news.fetchNewsArticle(Number(articleId));

  return {
    title: locale === 'en-GB' ? article?.titleEnglish : article?.titleNorwegian,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; articleId: string }>;
}) {
  const { locale, articleId } = await params;
  setRequestLocale(locale);

  if (Number.isNaN(Number(articleId))) return notFound();

  const t = await getTranslations('news');
  const formatter = await getFormatter();
  const article = await api.news.fetchNewsArticle(Number(articleId));

  if (!article) {
    return notFound();
  }

  const { minutes } = readingTime(
    locale === 'en-GB' ? article.contentEnglish : article.contentNorwegian,
  );

  const title =
    locale === 'en-GB' ? article.titleEnglish : article.titleNorwegian;
  const authorName = `${article.author?.firstName} ${article.author?.lastName}`;
  const content =
    locale === 'en-GB' ? article.contentEnglish : article.contentNorwegian;

  const imageUrl = article.imageId ? await getFileUrl(article.imageId) : null;
  const authorImageUrl = article.author?.profilePictureId
    ? await getFileUrl(article.author.profilePictureId)
    : null;

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
          {imageUrl ? (
            <Image
              className='h-auto w-full max-w-4xl rounded-lg'
              src={imageUrl}
              alt={title}
              width={1600}
              height={900}
              priority
            />
          ) : (
            <div className='flex h-96 w-full max-w-4xl items-center justify-center rounded-lg bg-muted'>
              <HackerspaceLogo className='h-32 w-32' />
            </div>
          )}
        </div>
        <h2 className='my-4'>{title}</h2>
      </header>
      <section className='mb-6 space-y-4'>
        <div className='flex items-center gap-4'>
          <AvatarIcon
            photoUrl={authorImageUrl}
            name={`${article.author?.firstName} ${article.author?.lastName}`}
            initials={`${article.author?.firstName?.charAt(0)}${article.author?.lastName?.charAt(0)}`}
          />
          <div className='flex flex-col'>
            <p className='font-montserrat font-semibold'>{authorName}</p>
            <small className='text-foreground/60'>
              {t('readTime', { count: Math.ceil(minutes) })}
              &nbsp;&nbsp;•&nbsp;&nbsp;
              {formatter.dateTime(article.createdAt)}
            </small>
            <small className='text-foreground/60'>
              {t('lastUpdated', {
                date: formatter.dateTime(article.updatedAt),
              })}
            </small>
          </div>
        </div>
        <Badge variant='secondary'>{`${article.views} ${t('views')}`}</Badge>
      </section>
      <section>{content}</section>
    </article>
  );
}
