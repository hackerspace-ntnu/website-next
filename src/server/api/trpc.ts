import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import type { TRPCContext } from '@/server/api/context';
import { errorFormatter } from '@/server/api/errorFormatter';

const trpc = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter,
});

const createCallerFactory = trpc.createCallerFactory;

const createRouter = trpc.router;

export { createRouter, createCallerFactory, trpc };
