'use client';

import { useState } from 'react';
import { api } from '@/lib/api/client';

export default function CoffeePage() {
  const [currentNumber, setNumber] = useState<number>(0);

  api.counter.count.useSubscription(undefined, {
    onData: (num) => {
      setNumber(num);
    },
  });

  return (
    <div>
      <h1>Hi there, this is the coffee page.</h1>
      <div>This is the current number: {currentNumber}</div>
    </div>
  );
}
