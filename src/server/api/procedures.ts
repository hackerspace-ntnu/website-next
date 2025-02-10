import { contextStorage } from '@/server/api/context';
import { trpc } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';

const contextMiddleware = trpc.middleware((opts) => {
  return contextStorage.run(opts.ctx, async () => {
    return await opts.next();
  });
});

const timingMiddleware = trpc.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (trpc._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const authMiddleware = trpc.middleware(async ({ next, ctx }) => {
  const { user, session } = await ctx.auth();

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: ctx.t('api.notAuthenticated'),
    });
  }
  return next({
    ctx: {
      ...ctx,
      user,
      session,
    },
  });
});

const procedureWithContext = trpc.procedure.use(contextMiddleware);

const publicProcedure = procedureWithContext.use(timingMiddleware);

const authenticatedProcedure = publicProcedure.use(authMiddleware);

export { publicProcedure, authenticatedProcedure };
