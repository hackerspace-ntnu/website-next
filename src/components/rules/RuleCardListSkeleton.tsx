import { RuleCardSkeleton } from '@/components/rules/RuleCardSkeleton';

function RuleCardListSkeleton() {
  return (
    <div className='mt-5 flex size-full flex-col items-center justify-center'>
      {Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
        <RuleCardSkeleton key={index} />
      ))}
    </div>
  );
}

export { RuleCardListSkeleton };
