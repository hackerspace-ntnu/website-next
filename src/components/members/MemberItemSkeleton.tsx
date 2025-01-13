import { Skeleton } from '@/components/ui/Skeleton';

function MemberItemSkeleton() {
  return (
    <div className='flex h-72 flex-col gap-4 overflow-hidden rounded-lg bg-card px-10 py-3 transition-colors'>
      <div className='relative h-44 w-44 self-center'>
        {/* Skeleton for the Profile Image */}
        <Skeleton className='h-full w-full rounded-full object-cover object-center' />
      </div>
      <div className='py-2 pr-1'>
        {/* Skeleton for the Name */}
        <Skeleton className='mb-2 h-[18px] w-5/6 rounded' />

        {/* Skeleton for the Group */}
        <Skeleton className='h-[12px] w-2/3 rounded sm:h-[14px]' />
      </div>
    </div>
  );
}

export { MemberItemSkeleton };
