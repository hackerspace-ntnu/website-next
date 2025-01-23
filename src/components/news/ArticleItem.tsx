import { InternalBadge } from '@/components/news/InternalBadge';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import Image from 'next/image';

type ArticleItemProps = {
  className?: string;
  id: number;
  internal: boolean;
  title: string;
  date: string;
  photoUrl: string;
};

function ArticleItem({
  className,
  id,
  internal,
  title,
  date,
  photoUrl,
}: ArticleItemProps) {
  return (
    <Link
      className={cx('group block whitespace-normal font-normal', className)}
      href={{
        pathname: '/news/[article]',
        params: { article: id },
      }}
    >
      <div className='flex gap-4 overflow-hidden rounded-lg transition-colors group-hover:bg-accent group-hover:dark:bg-card'>
        <div className='relative h-28 w-28 flex-shrink-0'>
          <InternalBadge className='h-5 w-5' internal={internal} />
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
  );
}

export { ArticleItem };
