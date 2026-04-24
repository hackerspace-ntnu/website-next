import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { NextRequest } from 'next/server';
import { env } from '@/env';
import { router } from '@/server/api';
import { createContext } from '@/server/api/context';
import { getLocaleFromRequest } from '@/server/api/locale';

function handleRequest(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/data',
    req,
    router,
    createContext: async () => await createContext(getLocaleFromRequest(req)),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            );
          }
        : undefined,
  });
}

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
