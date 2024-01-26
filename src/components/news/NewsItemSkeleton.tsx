import { Skeleton } from '@/components/ui/Skeleton';

function NewsItemSkeleton() {
  return (
    <div className='flex gap-4 overflow-hidden rounded-lg'>
      <div className='relative h-28 w-28 flex-shrink-0'>
        <Skeleton className='h-full w-full rounded-lg object-cover object-center' />
      </div>
      <div className='w-full py-2 pr-1'>
        <Skeleton className='h-[18px] w-5/6 py-[5px]' />
        <Skeleton className='h-[12px] w-2/3 py-[2px] sm:h-[14px] sm:py-[3px] [&:not(:first-child)]:mt-2' />
      </div>
    </div>
  );
}

export { NewsItemSkeleton };
