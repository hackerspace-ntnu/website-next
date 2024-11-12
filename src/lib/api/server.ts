import 'server-only';
import { getLocale } from 'next-intl/server';

import { createQueryClient } from '@/lib/api/queryClient';
import { createCaller, type router } from '@/server/api';
import { createContext } from '@/server/api/context';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext(await getLocale()));

const { trpc: api, HydrateClient } = createHydrationHelpers<typeof router>(
  caller,
  getQueryClient,
);

export { api, HydrateClient };
