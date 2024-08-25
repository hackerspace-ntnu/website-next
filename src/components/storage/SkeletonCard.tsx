import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonCard() {
  return (
    <div className='flex h-[350px] flex-col gap-5'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Skeleton className='h-[192px] w-[192px] rounded-lg' />
        <Skeleton className='h-[24px] w-[120px] rounded-full' />
        <Skeleton className='h-[14px] w-[70px] rounded-full' />
      </div>
      <div className='flex items-center justify-center gap-2'>
        <Skeleton className='h-[14px] w-[70px] rounded-full' />
        <Skeleton className='h-8 w-[100px] rounded-lg' />
      </div>
    </div>
  );
}
