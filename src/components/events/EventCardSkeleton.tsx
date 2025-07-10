import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/Card';

import { Skeleton } from '@/components/ui/Skeleton';

function EventCardSkeleton() {
  return (
    <Card className='flex flex-col text-center'>
      <CardHeader>
        <Skeleton className='mx-auto h-7 w-3/4' />
        <Skeleton className='mx-auto h-4 w-1/2' />
      </CardHeader>
      <CardContent className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-center'>
        <Skeleton className='h-32 w-full md:h-16 md:w-96' />
        <Skeleton className='h-48 w-48 shrink-0 rounded-full' />
      </CardContent>
      <CardFooter className='mt-auto flex-col'>
        <Skeleton className='h-6 w-56' />
        <Skeleton className='mt-2 h-6 w-48' />
      </CardFooter>
    </Card>
  );
}

export { EventCardSkeleton };
