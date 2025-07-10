import { useId } from 'react';
import { RuleCardSkeleton } from '@/components/rules/RuleCardSkeleton';

function RuleCardListSkeleton() {
  const ids = [useId(), useId(), useId(), useId(), useId()];
  return (
    <div className='mt-5 flex size-full flex-col items-center justify-center'>
      {ids.map((id) => (
        <RuleCardSkeleton key={id} />
      ))}
    </div>
  );
}

export { RuleCardListSkeleton };
