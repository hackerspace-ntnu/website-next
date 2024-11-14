import type { TRPCError as BaseTRPCError } from '@trpc/server';

type TRPCError = BaseTRPCError & {
  toast?: 'success' | 'info' | 'warning' | 'error';
};

export type { TRPCError };
