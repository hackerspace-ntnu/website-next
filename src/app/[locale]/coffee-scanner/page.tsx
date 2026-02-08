'use client';

import { useState } from 'react';
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
