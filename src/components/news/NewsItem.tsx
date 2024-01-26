import Image from 'next/image';

import { Link } from '@/lib/navigation';
import { cx } from '@/lib/utils';

import { InternalBadge } from '@/components/news/InternalBadge';
import { Button } from '@/components/ui/Button';

type NewsCardProps = {
  className?: string;
  id: number;
  internal: boolean;
  title: string;
  date: string;
  photoUrl: string;
  t: {
    internalArticle: string;
  };
};

function NewsItem({
  className,
  id,
  internal,
  title,
  date,
  photoUrl,
  t,
}: NewsCardProps) {
  return (
    <Button
      className={cx('group block whitespace-normal font-normal', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link
        href={{
          pathname: '/news/[articleId]',
          params: { articleId: id },
        }}
      >
        <div className='flex gap-4 overflow-hidden rounded-lg transition-colors group-hover:bg-accent group-hover:dark:bg-card'>
          <div className='relative h-28 w-28 flex-shrink-0'>
            <InternalBadge className='h-5 w-5' internal={internal} t={t} />
            <Image
              className='rounded-lg object-cover object-center'
              src={`/${photoUrl}`}
              alt={title}
              fill
            />
          </div>
          <div className='py-2 pr-1'>
            <h3 className='line-clamp-2 text-lg transition-colors group-hover:text-primary'>
              {title}
            </h3>
            <p className='line-clamp-2 text-xs sm:text-sm [&:not(:first-child)]:mt-2'>
              {date}
            </p>
          </div>
        </div>
      </Link>
    </Button>
  );
}

export { NewsItem };