'use client';

import { useState } from 'react';
import { api } from '@/lib/api/client';

export default function CoffeePage() {
  const [currentCardId, setCardId] = useState<string>('');

  api.coffeeScanner.scan.useSubscription(undefined, {
    onData: (data) => {
      setCardId(data);
    },
  });

  return (
    <div>
      <h1>Hi there, this is the coffee page.</h1>
      <div>This is the current id: {currentCardId}</div>
    </div>
  );
}
