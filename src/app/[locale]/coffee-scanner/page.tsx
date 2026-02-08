'use client';

import { useState } from 'react';
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
        <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-5/12 left-1/2 w-max max-w-9/10 text-center text-7xl'>
          Scan your student card before receiving coffee
        </h1>
        <div className='-translate-x-1/2 absolute bottom-0 left-1/2 mb-30 flex flex-row gap-2 text-4xl'>
          Provided by
          <div className='flex flex-row'>
            <HackerspaceLogo className='h-12 w-12' />
            Hackerspace
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
