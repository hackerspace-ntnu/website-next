import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { cx } from '@/lib/utils';

function RuleCardSkeleton() {
  return (
    <Card className='m-1.5 h-[68px] w-full max-w-[672px] shrink transform overflow-hidden rounded-xl md:h-[151px] '>
      <Skeleton className='h-full w-1/3 rounded-none' />
      <CardTitle className='flex h-full w-2/3 items-center justify-center'>
        <Skeleton className='h-4 w-full max-w-24 rounded-full sm:max-w-48 md:h-7' />
      </CardTitle>
    </Card>
  );
}

export { RuleCardSkeleton };
