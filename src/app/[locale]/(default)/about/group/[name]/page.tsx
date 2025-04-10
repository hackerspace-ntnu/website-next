import NotFoundPage from '@/app/not-found';
import { groupMockData as groupData } from '@/mock-data/groups';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function GroupPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const groupExists = groupData.find((groupName) => groupName.id === name);
  if (!groupExists) {
    return notFound();
  }

  const members = groupExists.members?.map((member) => {
    return (
      <div
        key={member}
        className='flex items-center justify-center self-center transition-colors duration-300 hover:bg-gray-200'
      >
        <div className='group relative flex h-80 w-80 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 text-white transition-colors duration-300 ease-in-out group-hover:bg-accent group-hover:dark:bg-card '>
          <p className='self-center bg-[length:0%_2px] bg-gradient-to-r bg-left-bottom from-white to-white bg-no-repeat transition-all duration-350 ease-out group-hover:bg-[length:100%_2px]'>
            {member}
          </p>
          <div className='relative z-10 h-44 w-44 self-center'>
            <Image
              className='object-cover'
              src={`/${groupExists.photoUrl}`}
              alt={name}
              fill
            />
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <h1 className='pb-4 underline'>{groupExists.name}</h1>
      <h3>{groupExists.description}</h3>
      <div>
        <div>
          <div className='relative z-10 h-44 w-44 self-center pb-8'>
            <Image
              className='rounded-full object-cover object-center'
              src={`/${groupExists.photoUrl}`}
              alt={name}
              fill
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 grid-rows-auto content-end gap-8'>
        {members}
      </div>
    </>
  );
}
