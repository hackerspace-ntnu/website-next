import Image from 'next/image';
import type { JSX } from 'react';

interface Group {
  photoUrl: string;
  members?: string[];
}

function generateGridItems(group: Group, name: string): JSX.Element[] {
  const gridItems: JSX.Element[] = [];

  group.members?.forEach((member) => {
    const index = group.members!.indexOf(member);

    if (index % 2 === 0) {
      gridItems.push(
        <div
          key={member}
          className='max-w relative flex h-80 flex-col gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 transition-colors group-hover:bg-accent group-hover:dark:bg-card'
        >
          <div className='group relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 text-white transition-colors duration-300 ease-in-out group-hover:bg-accent group-hover:dark:bg-card'>
            <p className='self-center bg-[length:0%_2px] bg-gradient-to-r bg-left-bottom from-white to-white bg-no-repeat transition-all duration-350 ease-out group-hover:bg-[length:100%_2px]'>
              {member}
            </p>
            <div className='relative z-10 h-60 w-60 self-center'>
              <Image
                className='object-cover'
                src={`/${group.photoUrl}`}
                alt={name}
                fill
              />
            </div>
          </div>
        </div>,
      );
      gridItems.push(
        <div
          key={`empty1-${member}`}
          className='max-w relative col-span-2 flex h-80 flex-col gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 transition-colors group-hover:bg-accent group-hover:dark:bg-card'
        >
          <h1>
            {member}'s Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Rerum, sed asperiores! Veniam, excepturi distinctio quo sapiente
            vitae tempora repudiandae a harum quasi doloribus laudantium
            recusandae ipsa quas voluptatibus soluta aliquid?
          </h1>
        </div>,
      );
    } else {
      gridItems.push(
        <div
          key={`empty1-${member}`}
          className='max-w relative col-span-2 flex h-80 flex-col gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 transition-colors group-hover:bg-accent group-hover:dark:bg-card'
        >
          <h1>
            {member}'s Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Rerum, sed asperiores! Veniam, excepturi distinctio quo sapiente
            vitae tempora repudiandae a harum quasi doloribus laudantium
            recusandae ipsa quas voluptatibus soluta aliquid?
          </h1>
        </div>,
      );
      gridItems.push(
        <div
          key={member}
          className='max-w relative flex h-80 flex-col gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 transition-colors group-hover:bg-accent group-hover:dark:bg-card'
        >
          <div className='group relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 text-white transition-colors duration-300 ease-in-out group-hover:bg-accent group-hover:dark:bg-card'>
            <p className='self-center bg-[length:0%_2px] bg-gradient-to-r bg-left-bottom from-white to-white bg-no-repeat transition-all duration-350 ease-out group-hover:bg-[length:100%_2px]'>
              {member}
            </p>
            <div className='relative z-10 h-60 w-60 self-center'>
              <Image
                className='object-cover'
                src={`/${group.photoUrl}`}
                alt={name}
                fill
              />
            </div>
          </div>
        </div>,
      );
    }
  });

  return gridItems;
}
export { generateGridItems, type Group };
