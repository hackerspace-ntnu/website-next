import { trpc } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';

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

const publicProcedure = trpc.procedure.use(timingMiddleware);

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

const authenticatedProcedure = publicProcedure.use(authMiddleware);

export { publicProcedure, authenticatedProcedure };
