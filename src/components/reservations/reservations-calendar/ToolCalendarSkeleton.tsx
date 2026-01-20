import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

function ToolCalendarSkeleton() {
  return (
    <div className='flex h-full w-full flex-col gap-2'>
      <Card className='flex h-[1044px] w-full max-w-[1432.5px] flex-col gap-2 overflow-hidden rounded-xl p-1'>
        <Skeleton className='mt-auto h-full max-h-[142px] w-full rounded-xl' />
        <Skeleton className='h-[109.5px] w-full rounded-xl' />
        <Skeleton className='mx-auto h-full max-h-[792.5px] w-full rounded-xl' />
      </Card>
    </div>
  );
}

export { ToolCalendarSkeleton };
