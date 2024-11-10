import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { cx } from '@/lib/utils';

function RuleCardSkeleton() {
  return (
    <Button
      className={cx('group whitespace-normal font-normal ring-0')}
      asChild
      variant='none'
      size='none'
    >
      <Card className='mb-3 h-[68px] w-full max-w-[614px] shrink transform overflow-hidden rounded-xl brightness-95 transition delay-150 duration-300 ease-in-out hover:scale-105 hover:border-primary hover:shadow-lg hover:brightness-100 md:h-[138px] dark:brightness-100 hover:dark:brightness-110'>
        <Skeleton className='h-full w-1/3 rounded-none' />
        <CardTitle className='flex h-full w-2/3 items-center justify-center'>
          <Skeleton className='h-4 w-full max-w-24 rounded-full sm:max-w-48 md:h-7' />
        </CardTitle>
      </Card>
    </Button>
  );
}

export { RuleCardSkeleton };
