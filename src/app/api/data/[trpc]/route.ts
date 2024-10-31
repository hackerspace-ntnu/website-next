import { env } from '@/env';
import { router } from '@/server/api';
import { createContext } from '@/server/api/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { NextRequest } from 'next/server';

const handleRequest = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/data',
    req,
    router,
    createContext,
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            );
          }
        : undefined,
  });

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
