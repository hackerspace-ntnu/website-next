import Image from 'next/image';
import { getFormatter } from 'next-intl/server';
import { HackerspaceLogo } from '@/components/assets/logos';
import { InternalBadge } from '@/components/news/InternalBadge';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import { getFileUrl } from '@/server/services/files';

type ArticleItemProps = {
  className?: string;
  id: number;
  internal: boolean;
  title: string;
  date: Date;
  imageId?: number | null;
};

async function ArticleItem({
  className,
  id,
  internal,
  title,
  date,
  imageId,
}: ArticleItemProps) {
  const formatter = await getFormatter();
  const imageUrl = imageId ? await getFileUrl(imageId) : null;

  return (
    <Link
      className={cx('group block whitespace-normal font-normal', className)}
      href={{
        pathname: '/news/[articleId]',
        params: { articleId: id },
      }}
    >
      <div className='flex gap-4 overflow-hidden rounded-lg transition-colors group-hover:bg-accent group-hover:dark:bg-card'>
        <div className='relative h-28 w-28 shrink-0'>
          <InternalBadge className='h-5 w-5' internal={internal} />
          {imageUrl ? (
            <Image
              className='rounded-lg object-cover object-center'
              src={imageUrl}
              alt={title}
              fill
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-lg bg-muted'>
              <HackerspaceLogo className='h-12 w-12' />
            </div>
          )}
        </div>
        <div className='py-2 pr-1'>
          <h3 className='line-clamp-2 text-lg transition-colors group-hover:text-primary'>
            {title}
          </h3>
          <p className='line-clamp-2 text-xs sm:text-sm [&:not(:first-child)]:mt-2'>
            {formatter.dateTime(date)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export { ArticleItem };
