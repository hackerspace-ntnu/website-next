import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <div className='mx-auto inline-block'>
          <Skeleton className='h-48 w-48 rounded-lg' />
        </div>
        <CardTitle className='mt-2 truncate leading-tight'>
          <Skeleton className='mx-auto h-8 w-[150px]' />
        </CardTitle>
        <CardDescription className='my-2 flex flex-col gap-1'>
          <Skeleton className='mx-auto h-5 w-[100px]' />
        </CardDescription>
      </CardHeader>
      <CardFooter className='justify-center gap-2'>
        <Skeleton className='h-4 w-[50px]' />
        <Skeleton className='h-10 w-24' />
      </CardFooter>
    </Card>
  );
}
