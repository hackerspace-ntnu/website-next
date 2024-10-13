import { InternalBadge } from '@/components/news/InternalBadge';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';
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
    <Button
      className={cx('group whitespace-normal font-normal', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link
        href={{
          pathname: '/news/[article]',
          params: { article: id },
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
          <CardHeader className='mt-auto w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:p-6'>
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
    </Button>
  );
}

export { ArticleCard };
