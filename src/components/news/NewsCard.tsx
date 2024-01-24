import { cx } from '@/lib/utils';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

type NewsCardProps = {
  className?: string;
  title: string;
  date: string;
  photoUrl: string;
};

function NewsCard({ className, title, date, photoUrl }: NewsCardProps) {
  return (
    <Card
      className={cx(
        'flex h-full min-h-32 w-full bg-cover bg-center',
        className,
      )}
      style={{ backgroundImage: `url(/${photoUrl})` }}
    >
      <CardHeader className='mt-auto w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:p-6'>
        <CardTitle className='line-clamp-1 text-lg sm:text-xl lg:text-2xl'>
          {title}
        </CardTitle>
        <CardDescription className='line-clamp-1 text-xs sm:text-sm'>
          {date}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export { NewsCard };
