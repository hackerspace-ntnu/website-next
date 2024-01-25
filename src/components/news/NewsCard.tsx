import Image from 'next/image';

import { Link } from '@/lib/navigation';
import { cx } from '@/lib/utils';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

type NewsCardProps = {
  className?: string;
  id: number;
  title: string;
  date: string;
  photoUrl: string;
};

function NewsCard({ className, id, title, date, photoUrl }: NewsCardProps) {
  return (
    <Button
      className={cx('whitespace-normal font-normal', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link href={`/news/${id}`}>
        <Card
          className={cx(
            'relative flex h-full min-h-32 w-full bg-cover bg-center',
            className,
          )}
        >
          <Image
            className='rounded-lg object-cover object-center'
            src={`/${photoUrl}`}
            alt={title}
            fill
          />
          <CardHeader className='mt-auto w-full rounded-b-lg bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:p-6'>
            <CardTitle className='line-clamp-1 text-lg sm:text-xl lg:text-2xl'>
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

export { NewsCard };
