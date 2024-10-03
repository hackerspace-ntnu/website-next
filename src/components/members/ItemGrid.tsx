import { memberMockData as memberData } from '@/mock-data/member';

import { MemberItem } from '@/components/members/MemberItem';

type ItemGridProps = {
  page: number;
};

function ItemGrid({ page }: ItemGridProps) {
  const itemsDisplayedAsCards = 0;
  const itemsPerPage = 9;

  const start = (page - 1) * itemsPerPage + itemsDisplayedAsCards;
  const end = start + itemsPerPage;
  const currentData = memberData.slice(start, end);
  return (
    <div className='grid min-h-[752px] grid-cols-1 gap-4 gap-y-8 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-4'>
      {currentData.map((data) => (
        <MemberItem
          key={data.id}
          id={data.id}
          internal={data.internal}
          name={data.name}
          group={data.group}
          photoUrl={data.photoUrl}
        />
      ))}
    </div>
  );
}

export { ItemGrid, type ItemGridProps };