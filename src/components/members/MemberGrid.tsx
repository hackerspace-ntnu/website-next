import { memberMockData as memberData } from '@/mock-data/member';

import { MemberItem } from '@/components/members/MemberItem';

type MemberGridProps = {
  page: number;
};

function MemberGrid({ page }: MemberGridProps) {
  const itemsDisplayedAsCards = 0;
  const itemsPerPage = 8;

  const start = (page - 1) * itemsPerPage + itemsDisplayedAsCards;
  const end = start + itemsPerPage;
  const currentData = memberData.slice(start, end);
  return (
    <div className='mx-auto grid w-11/12 grid-cols-1 justify-items-center gap-10 sm:grid-cols-3 sm:gap-24 lg:grid-cols-4'>
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

export { MemberGrid, type MemberGridProps };
