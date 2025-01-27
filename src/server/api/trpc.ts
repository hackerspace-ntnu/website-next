import type { TRPCContext } from '@/server/api/context';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

const trpc = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      toast:
        error instanceof ZodError
          ? 'error'
          : (
              error.cause as {
                toast?: 'info' | 'error' | 'warning' | 'success';
              }
            )?.toast,
    },
  }),
});

const createCallerFactory = trpc.createCallerFactory;

const createRouter = trpc.router;

export { createRouter, createCallerFactory, trpc };
