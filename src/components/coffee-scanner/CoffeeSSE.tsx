'use client';

import { useState } from 'react';
import { CoffeeActive } from '@/components/coffee-scanner/CoffeeActive';
import { CoffeeIdle } from '@/components/coffee-scanner/CoffeeIdle';
import { api } from '@/lib/api/client';

function CoffeeSSE() {
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

  // Temporarily commented for debugging.
  // useEffect(() => {
  //   if (currentCardId !== '') {
  //     // const timeout = setTimeout(() => setCardId(''), 50000); // 5 Minutes
  //     // return () => clearTimeout(timeout);
  //   }
  // }, [currentCardId]);
  if (currentCardId === '') {
    return <CoffeeIdle />;
  }
  return (
    <CoffeeActive cardId={currentCardId} tooMuchChocolate={tooMuchChocolate} />
  );
}

export { CoffeeSSE };
