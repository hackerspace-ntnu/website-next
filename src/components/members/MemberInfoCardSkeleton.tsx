import { useId } from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

async function MemberInfoCardSkeleton() {
  const ids = [useId(), useId(), useId(), useId(), useId()];

  return (
    <Card className='relative flex w-full overflow-hidden rounded-xl p-4 lg:w-fit lg:min-w-96'>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='relative my-2 size-48 lg:size-64'>
          <Skeleton className='h-full w-full rounded-full' />
        </div>
        <Skeleton className='mt-4 h-10 w-48' />
        <Skeleton className='mx-auto my-4 h-6 w-32' />
        <Skeleton className='mx-auto my-6 h-20 w-full max-w-prose' />
        <ul className='mb-5 flex justify-center divide-x sm:grid sm:grid-cols-3-auto md:grid-flow-col xl:grid-flow-col xl:grid-cols-none md:xl:grid-cols-none [&>li]:px-2'>
          {ids.map((id) => (
            <li key={id}>
              <Skeleton className='h-8 w-8' />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export { MemberInfoCardSkeleton };
