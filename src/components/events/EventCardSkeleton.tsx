import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

import { Skeleton } from '@/components/ui/Skeleton';

function EventCardSkeleton() {
  return (
    <Card className='flex flex-col text-center'>
      <CardHeader>
        <Skeleton className='mx-auto h-8 w-3/4' />
        <Skeleton className='mx-auto h-5 w-1/2' />
      </CardHeader>
      <CardContent className='flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between'>
        <Skeleton className='h-16 w-full md:h-16 md:w-3/5 md:flex-1' />
        <Skeleton className='h-36 w-36 rounded-full md:h-48 md:w-48' />
      </CardContent>
      <CardFooter className='mt-auto flex-col gap-2'>
        <Skeleton className='h-5 w-32 md:w-56' />
        <Skeleton className='h-5 w-28 md:w-52' />
      </CardFooter>
    </Card>
  );
}

export { EventCardSkeleton };
