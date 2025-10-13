import { Skeleton } from '@/components/ui/Skeleton';

function MyReservationsTableSkeleton() {
  return (
    <div className='mx-auto flex h-full w-full max-w-3xl flex-col gap-1'>
      <div className='max-h-96 rounded-xl border bg-secondary/50'>
        <Skeleton className='mb-1 h-15 w-full' />
        <Skeleton className='mb-1 h-10 w-full' />
        <Skeleton className='h-20 w-full' />
      </div>
    </div>
  );
}

export { MyReservationsTableSkeleton };
