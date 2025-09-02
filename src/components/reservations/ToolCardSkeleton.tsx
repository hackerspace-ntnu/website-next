import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

function ToolCardSkeleton() {
  return (
    <Card className='relative z-0 flex h-112 w-80 flex-col overflow-hidden rounded-xl'>
      <CardHeader className='p-0'>
        <Skeleton className='h-48 w-full' />
        <CardTitle className='m-3 flex flex-col gap-1'>
          <Skeleton className='h-7 w-full' />
          <Skeleton className='h-7 w-full' />
        </CardTitle>
        <div className='m-3'>
          <Skeleton className='m-2 inline-flex h-5 w-20' />
          <Skeleton className='m-2 inline-flex h-5 w-20' />
          <Skeleton className='m-2 inline-flex h-5 w-20' />
        </div>
      </CardHeader>
      <CardFooter className='mt-auto p-0'>
        <Skeleton className='h-14 w-full' />
      </CardFooter>
    </Card>
  );
}

export { ToolCardSkeleton };
