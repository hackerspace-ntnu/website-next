import { InternalBadge } from '@/components/news/InternalBadge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import Image from 'next/image';

type ArticleCardProps = {
  className?: string;
  id: number;
  internal: boolean;
  title: string;
  date: string;
  photoUrl: string;
};

function ArticleCard({
  className,
  id,
  internal,
  title,
  date,
  photoUrl,
}: ArticleCardProps) {
  return (
    <Link
      className={cx('group whitespace-normal font-normal', className)}
      href={{
        pathname: '/news/[articleId]',
        params: { articleId: id },
      }}
    >
      <Card className='relative flex h-full min-h-32 w-full overflow-hidden'>
        <InternalBadge internal={internal} />
        <Image
          className='rounded-lg object-cover object-center transition-transform duration-300 group-hover:scale-105'
          src={`/${photoUrl}`}
          alt={title}
          priority
          fill
        />
        <CardHeader className='mt-auto w-full bg-background/95 p-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 lg:p-6'>
          <CardTitle
            className='line-clamp-1 text-lg transition-colors group-hover:text-primary sm:text-xl lg:text-2xl'
            level='h2'
          >
            {title}
          </CardTitle>
          <CardDescription className='line-clamp-1 text-xs sm:text-sm'>
            {date}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export { ArticleCard };
