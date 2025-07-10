'use client';

import { env } from '@/env';
import { api } from '@/lib/api/client';
import { createQueryClient } from '@/lib/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { useLocale } from 'next-intl';
import { cache, useEffect, useState } from 'react';
import SuperJSON from 'superjson';

const getQueryClient = cache(createQueryClient);

function TRPCProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const locale = useLocale();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [queryClient]);

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
          url: `${typeof window === 'undefined' ? env.NEXT_PUBLIC_SITE_URL : ''}/api/data`,
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
