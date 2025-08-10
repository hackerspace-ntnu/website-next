import Image from 'next/image';
import { getFormatter } from 'next-intl/server';
import { HackerspaceLogo } from '@/components/assets/logos';
import { InternalBadge } from '@/components/news/InternalBadge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import { getFileUrl } from '@/server/services/files';

type ArticleCardProps = {
  className?: string;
  id: number;
  internal: boolean;
  title: string;
  date: Date;
  imageId?: number | null;
};

async function ArticleCard({
  className,
  id,
  internal,
  title,
  date,
  imageId,
}: ArticleCardProps) {
  const formatter = await getFormatter();
  const imageUrl = imageId ? await getFileUrl(imageId) : null;

  return (
    <Link
      className={cx('group whitespace-normal font-normal', className)}
      href={{
        pathname: '/news/[articleId]',
        params: { articleId: id },
      }}
    >
      <Card className='relative flex h-full min-h-32 w-full items-center justify-center overflow-hidden'>
        <InternalBadge internal={internal} />
        {imageUrl ? (
          <Image
            className='rounded-lg object-cover object-center transition-transform duration-300 group-hover:scale-105'
            src={imageUrl}
            alt={title}
            priority
            fill
          />
        ) : (
          <HackerspaceLogo className='-translate-x-1/2 -translate-y-1/4 absolute top-1/4 left-1/2 h-14 w-14' />
        )}
        <CardHeader className='mt-auto w-full bg-background/95 p-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 lg:p-6'>
          <CardTitle
            className='line-clamp-1 text-lg transition-colors group-hover:text-primary sm:text-xl lg:text-2xl'
            level='h2'
          >
            {title}
          </CardTitle>
          <CardDescription className='line-clamp-1 text-xs sm:text-sm'>
            {formatter.dateTime(date)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export { ArticleCard };
