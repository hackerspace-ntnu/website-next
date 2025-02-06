import { RuleCardSkeleton } from '@/components/rules/RuleCardSkeleton';
import { useId } from 'react';

function RuleCardListSkeleton() {
  return (
    <div className='mt-5 flex size-full flex-col items-center justify-center'>
      {Array.from({ length: 5 }).map(() => (
        <RuleCardSkeleton key={useId()} />
      ))}
    </div>
  );
}

export { RuleCardListSkeleton };
