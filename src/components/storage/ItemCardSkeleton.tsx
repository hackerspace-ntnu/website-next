import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function ItemCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className='mx-auto inline-block rounded-md'>
          <Skeleton className='h-48 w-48' />
        </div>
        <CardTitle className='mt-2'>
          <Skeleton className='mx-auto my-[3px] h-6 w-2/3' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='mx-auto my-[3px] h-[14px] w-1/2' />
        </CardDescription>
      </CardHeader>
      <CardFooter className='justify-center gap-2'>
        <Skeleton className='my-[3px] h-[14px] w-1/5' />
        <Skeleton className='h-10 w-[106.25px]' />
      </CardFooter>
    </Card>
  );
}
