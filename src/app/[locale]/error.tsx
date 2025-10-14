'use client';

import { useEffect } from 'react';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPageContent error={error} reset={reset} />;
}
