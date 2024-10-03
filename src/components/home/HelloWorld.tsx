'use client';

import { api } from '@/lib/api/client';

function HelloWorld() {
  // Grunnleggende eksempel på get request i en client-side komponent
  // Se på react query info fra hvordan dette fungerer
  const { data: hello, isLoading } = api.test.helloWorld.useQuery();
  return <h1>{isLoading ? 'laster inn test' : hello}</h1>;
}

export { HelloWorld };
