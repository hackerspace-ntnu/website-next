import { contextStorage } from '@/server/api/context';
import { trpc } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';

// Makes the context available in input validation
const procedureWithContext = trpc.procedure.use((opts) => {
  return contextStorage.run(opts.ctx, async () => {
    return await opts.next();
  });
});

// Use this procedure for any public endpoint
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

// This procedure is only for when registrering a new account and we need to check that the account is authenticated even though it's not complete
const registrationProcedure = publicProcedure.use(async ({ next, ctx }) => {
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

// Authenticated procedure is for when the user is authenticated and the account is complete
const authenticatedProcedure = registrationProcedure.use(
  async ({ next, ctx }) => {
    if (!ctx.user.passwordHash) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: ctx.t('api.notAuthenticated'),
      });
    }

    return next();
  },
);

// Check if the user is part of a group (is a member)
// Should be used for things like news and shift schedule. Every member should be able to create news articles
const protectedProcedure = authenticatedProcedure.use(async ({ next, ctx }) => {
  if (ctx.user.groups.length === 0) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: ctx.t('api.notAuthorized'),
    });
  }

  return next();
});

// Check if the user is part of management (Mangagement includes the leadership team and the leaders of the other groups)
// Should be used for events
const managementProcedure = protectedProcedure.use(async ({ next, ctx }) => {
  if (
    !ctx.user.groups.some(
      // The admin role should have access to every procedure
      (group) => group === 'management' || group === 'admin',
    )
  ) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: ctx.t('api.notAuthorized'),
    });
  }

  return next();
});

// Check if the user is part of the leadership
// This should be used for the administrator menu
const leadershipProcedure = protectedProcedure.use(async ({ next, ctx }) => {
  if (
    !ctx.user.groups.some(
      (group) => group === 'leadership' || group === 'admin',
    )
  ) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: ctx.t('api.notAuthorized'),
    });
  }

  return next();
});

// Check if the user should be allowed to edit the storage
const storageProcedure = protectedProcedure.use(async ({ next, ctx }) => {
  if (
    !ctx.user.groups.some(
      (group) =>
        group === 'labops' || group === 'leadership' || group === 'admin',
    )
  ) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: ctx.t('api.notAuthorized'),
    });
  }

  return next();
});

export {
  publicProcedure,
  registrationProcedure,
  authenticatedProcedure,
  protectedProcedure,
  managementProcedure,
  leadershipProcedure,
  storageProcedure,
};
