import type { router } from '@/server/api';
import type { TRPCClientError as BaseTRPCClientError } from '@trpc/client';

type TRPCClientError = BaseTRPCClientError<typeof router> & {
  toast?: 'success' | 'info' | 'warning' | 'error';
};

export type { TRPCClientError };
