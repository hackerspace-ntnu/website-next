import { Card, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

function RuleCardListSkeleton() {
  return (
    <div className='mt-5 flex size-full flex-col items-center justify-center'>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
          key={index}
          className='m-1.5 flex h-18 w-full max-w-2xl shrink transform overflow-hidden rounded-xl'
        >
          <Skeleton className='h-full w-1/3 rounded-none' />
          <CardTitle className='flex h-full w-2/3 items-center justify-center'>
            <Skeleton className='h-6 w-full max-w-24 rounded-md sm:max-w-48' />
          </CardTitle>
        </Card>
      ))}
    </div>
  );
}

export { RuleCardListSkeleton };
