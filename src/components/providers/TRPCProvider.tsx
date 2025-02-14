'use client';

import { env } from '@/env';
import { api } from '@/lib/api/client';
import { createQueryClient } from '@/lib/api/queryClient';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useState } from 'react';
import SuperJSON from 'superjson';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient();
  }
  return clientQueryClientSingleton;
};

function TRPCProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const locale = useLocale();

  // biome-ignore lint/correctness/useExhaustiveDependencies: locale is needed to trigger revalidation on language change
  useEffect(() => {
    queryClient.invalidateQueries();
  }, [locale, queryClient]);

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          transformer: SuperJSON,
          url: `${env.NEXT_PUBLIC_SITE_URL}/api/data`,
          headers() {
            return {
              'accept-language': locale,
            };
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          {props.children}
        </api.Provider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}

export { TRPCProvider };
