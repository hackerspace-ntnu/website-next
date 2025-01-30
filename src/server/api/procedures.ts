import { contextStorage } from '@/server/api/context';
import { trpc } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';

const procedureWithContext = trpc.procedure.use((opts) => {
  return contextStorage.run(opts.ctx, async () => {
    return await opts.next();
  });
});

const publicProcedure = procedureWithContext.use(async ({ next, path }) => {
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

const authenticatedProcedure = publicProcedure.use(async ({ next, ctx }) => {
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

const authenticatedProcedureWithPassword = authenticatedProcedure.use(
  async ({ next, ctx }) => {
    if (!ctx.user.passwordHash) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: ctx.t('auth.invalidCredentials'),
      });
    }

    return next();
  },
);

export {
  publicProcedure,
  authenticatedProcedure,
  authenticatedProcedureWithPassword,
};
