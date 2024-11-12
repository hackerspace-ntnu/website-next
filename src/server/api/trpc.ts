import type { createContext } from '@/server/api/context';
import { type TRPCError, initTRPC } from '@trpc/server';
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
      },
    };
  },
});

const createCallerFactory = trpc.createCallerFactory;

const createRouter = trpc.router;

export { createRouter, createCallerFactory, trpc };
