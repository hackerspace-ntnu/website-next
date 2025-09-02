import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

function CalendarSkeleton() {
  return (
    <div className='flex h-full w-full flex-col gap-2'>
      <Skeleton className='h-[40px] w-[184px] self-center rounded-xl' />
      <Card className='flex h-[847.75px] w-[1432.5px] flex-col gap-2 overflow-hidden rounded-xl p-1'>
        <Skeleton className='h-[109.5px] w-full rounded-xl' />

        <Skeleton className='mx-auto h-full w-full rounded-xl' />

        <Skeleton className='mt-auto h-[142px] w-full rounded-xl' />
      </Card>
    </div>
  );
}

export { CalendarSkeleton };
