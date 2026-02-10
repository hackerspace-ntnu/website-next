'use client';

import { useState } from 'react';
import { AnimatedCoffeeScannerSVG } from '@/components/assets/CoffeeScannerSVG';
import { HackerspaceLogo } from '@/components/assets/logos';
import { api } from '@/lib/api/client';

export default function CoffeePage() {
  const [currentCardId, setCardId] = useState<string>('');
  const [tooMuchChocolate, setTooMuchChocolate] = useState<boolean>(false);

  api.coffeeScanner.scan.useSubscription(undefined, {
    onData: (data) => {
      setCardId(data);
    },
  });

  api.coffeeScanner.tooMuchChocolate.useSubscription(undefined, {
    onData: (data) => {
      setTooMuchChocolate(data);
    },
  });

  if (currentCardId === '') {
    return (
      <main className='absolute top-0 left-0 h-full w-full'>
        <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-2/12 left-1/2 w-max max-w-9/10 text-center font-extrabold text-7xl'>
          Want some{' '}
          <span className='relative inline-block text-[#5E3023]'>
            coffee?
            <span
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(110deg,transparent_42%,#EBBE9Bcc_45%,#F5F9E9cc_50%,#EBBE9Bcc_55%,transparent_58%)] bg-clip-text text-transparent'
            >
              coffee?
            </span>
          </span>
        </h1>
        <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-5/12 left-1/2 w-max max-w-9/10 text-center font-normal text-6xl'>
          Scan your <span className='font-extrabold'>student card</span>
          before grabbing a drink
        </h1>
        <AnimatedCoffeeScannerSVG className='-translate-x-1/2 -translate-y-1/2 absolute top-17/20 left-12/20 h-100 w-100' />
        <div className='absolute bottom-10 left-10 flex flex-row items-center gap-2 text-lg'>
          <span className='font-montserrat'>PROVIDED BY</span>
          <div className='flex flex-row items-center'>
            <HackerspaceLogo className='h-6 w-6' />
            <span className='font-bold font-montserrat'> HACKERSPACE</span>
          </div>
        </div>
      </main>
    );
  }
  return (
    <div>
      <h1>Hi there, this is the coffee page.</h1>
      <div>This is the current id: {currentCardId}</div>
      {tooMuchChocolate && (
        <div>This user has taken too much chocolate. SHAME ON YOU!</div>
      )}
    </div>
  );
}
