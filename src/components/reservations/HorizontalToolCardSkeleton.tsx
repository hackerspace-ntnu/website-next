import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

function HorizontalToolCardSkeleton() {
  return (
    <Card className='flex h-30 w-full flex-row overflow-hidden rounded-xl'>
      <CardHeader className='p-0'>
        <Skeleton className='h-full w-40' />
      </CardHeader>
      <CardFooter className='mt-auto w-full p-0'>
        <Skeleton className='h-14 w-full' />
      </CardFooter>
    </Card>
  );
}

export { HorizontalToolCardSkeleton };
