import { Skeleton } from '@/components/ui/Skeleton';
import { cx } from '@/lib/utils';

type TextBlockSkeletonProps = {
  imgSide: 'left' | 'right';
  children: React.ReactNode;
};

function TextBlockSkeleton({ imgSide, children }: TextBlockSkeletonProps) {
  return (
    <>
      <div
        className={cx(
          imgSide === 'left' ? 'mr-auto' : 'ml-auto',
          'hidden max-w-6xl justify-between lg:flex',
        )}
      >
        {imgSide === 'left' && <Skeleton className='h-64 w-5/12 rounded-xl' />}
        <div className='my-auto w-1/2 space-y-5 pb-3'>{children}</div>
        {imgSide === 'right' && <Skeleton className='h-64 w-5/12 rounded-xl' />}
      </div>
      <div className='flex flex-col space-y-5 lg:hidden'>
        {children}
        <Skeleton className='h-64 w-full rounded-xl' />
      </div>
    </>
  );
}

export { TextBlockSkeleton };
