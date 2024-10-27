import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { cx } from '@/lib/utils';
import { Skeleton } from '../ui/Skeleton';

/**
 * A card for an event.
 * Only set the _active prop to true if you're testing active events.
 */
function EventCardSkeleton() {
  return (
    <Card className={cx('text-center')}>
      <CardHeader>
        <Skeleton className='mx-auto h-8 w-3/4' />
        <Skeleton className='mx-auto h-5 w-1/2' />
      </CardHeader>
      <CardContent className='grid grid-cols-10 gap-2'>
        <Skeleton className='col-span-6 h-3/4 w-ful flex-1' />
        <Skeleton className='col-span-4 ml-auto h-48 w-48 rounded-full' />
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <Skeleton className='h-5 w-56' />
        <Skeleton className='h-5 w-52' />
      </CardFooter>
    </Card>
  );
}

export { EventCardSkeleton };
