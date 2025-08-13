import type { TRPCClientError as BaseTRPCClientError } from '@trpc/client';
import type { inferRouterError } from '@trpc/server';
import type { router } from '@/server/api';

type TRPCClientError = BaseTRPCClientError<typeof router> & {
  data?: inferRouterError<typeof router>['data'] & {
    toast?: 'success' | 'info' | 'warning' | 'error';
  };
};

export type { TRPCClientError };
