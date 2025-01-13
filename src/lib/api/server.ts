import 'server-only';

import { createQueryClient } from '@/lib/api/queryClient';
import type { routing } from '@/lib/locale';
import { createCaller, type router } from '@/server/api';
import { createContext } from '@/server/api/context';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { getLocale } from 'next-intl/server';
import { cache } from 'react';

const getQueryClient = cache(createQueryClient);

const getApiClient = cache(async () => {
  const locale = await getLocale();
  const caller = createCaller(
    createContext(locale as (typeof routing.locales)[number]),
  );

  return createHydrationHelpers<typeof router>(caller, getQueryClient);
});

type ApiClient = Awaited<ReturnType<typeof getApiClient>>['trpc'];

const api = new Proxy({} as ApiClient, {
  get(_target, prop: keyof ApiClient) {
    return new Proxy(
      {},
      {
        get(_target, method: string) {
          return async (...args: unknown[]) => {
            const { trpc } = await getApiClient();
            type Router = ApiClient[typeof prop];
            return (
              trpc[prop][method as keyof Router] as (
                ...args: unknown[]
              ) => Promise<unknown>
            )(...args);
          };
        },
      },
    );
  },
});

// async function api() {
//   const { trpc } = await getApiClient();
//   return trpc;
// }

export { api };
