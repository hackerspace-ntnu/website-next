import type { createContext } from '@/server/api/context';
import type { TRPCError } from '@/server/api/types';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

const trpc = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    const TRPCError = error as TRPCError;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          TRPCError.cause instanceof ZodError
            ? TRPCError.cause.flatten()
            : null,
        toast: TRPCError.toast,
      },
    };
  },
});

const createCallerFactory = trpc.createCallerFactory;

const createRouter = trpc.router;

export { createRouter, createCallerFactory, trpc };
