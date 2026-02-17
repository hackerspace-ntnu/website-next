'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CoffeeActive } from '@/components/coffee-scanner/CoffeeActive';
import { CoffeeFinished } from '@/components/coffee-scanner/CoffeeFinished';
import { CoffeeIdle } from '@/components/coffee-scanner/CoffeeIdle';
import { api } from '@/lib/api/client';

function CoffeeSSE() {
  const [currentCardId, setCardId] = useState<string>('');
  const [complete, setComplete] = useState<boolean>(false);
  const [tooMuchChocolate, setTooMuchChocolate] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const resetPage = useCallback((delay: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCardId('');
      setComplete(false);
      timeoutRef.current = null;
    }, delay);
  }, []);

  const onComplete = () => {
    setComplete(true);
    resetPage(8000); // 8 seconds
  };

  useEffect(() => {
    if (currentCardId !== '') {
      resetPage(60000); // 3 minutes
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // To prevent memory leak
    };
  }, [currentCardId, resetPage]);

  if (complete) {
    return <CoffeeFinished />;
  }
  if (currentCardId === '') {
    return <CoffeeIdle />;
  }
  return (
    <CoffeeActive
      cardId={currentCardId}
      tooMuchChocolate={tooMuchChocolate}
      onComplete={onComplete}
    />
  );
}

export { CoffeeSSE };
