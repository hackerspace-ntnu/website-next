import { Skeleton } from '@/components/ui/Skeleton';

function ArticleItemSkeleton() {
  return (
    <div className='flex gap-4 overflow-hidden rounded-lg'>
      <div className='relative h-28 w-28 shrink-0'>
        <Skeleton className='h-full w-full rounded-lg object-cover object-center' />
      </div>
      <div className='w-full py-2 pr-1'>
        <Skeleton className='my-[5px] h-[18px] w-5/6 rounded-lg' />
        <div className='[&:not(:first-child)]:pt-2'>
          <Skeleton className='my-[2px] h-[12px] w-1/2 rounded-lg sm:my-[3px] sm:h-[14px]' />
        </div>
      </div>
    </div>
  );
}

export { ArticleItemSkeleton };
