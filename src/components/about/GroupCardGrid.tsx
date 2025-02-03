import { groupMockData as groupData } from '@/mock-data/groups';
import { GroupCard } from './GroupCard';

function GroupCardGrid() {
  return (
    <div className='mx-auto grid w-11/12 justify-items-center sm:grid-cols-3 sm:gap-x-24 sm:gap-y-7 lg:grid-cols-3'>
      {groupData.map((data) => (
        <GroupCard
          key={data.id}
          id={data.id}
          name={data.name}
          photoUrl={data.photoUrl}
          description={data.description}
        />
      ))}
    </div>
  );
}

export { GroupCardGrid };
