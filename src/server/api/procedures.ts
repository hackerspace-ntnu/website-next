import { contextStorage } from '@/server/api/context';
import { trpc } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';

/**
 * Makes the context available in input validation
 */
const procedureWithContext = trpc.procedure.use((opts) => {
  return contextStorage.run(opts.ctx, async () => {
    return await opts.next();
  });
});

/**
 * Use this procedure for any public endpoint.
 * The timing here adds a varying delay to see loading states in development.
 */
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

/**
 * Procedure for registering a new account.
 * Checks that the account is authenticated even if not complete.
 */
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

/**
 * Authenticated procedure for users with complete accounts.
 * Requires user to be authenticated and have a password hash.
 */
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

/**
 * Checks if the user is part of a group (is a member).
 * Should be used for features like news and shift schedule.
 * Every member should be able to create news articles.
 */
const protectedProcedure = authenticatedProcedure.use(async ({ next, ctx }) => {
  if (ctx.user.groups.length === 0) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: ctx.t('api.notAuthorized'),
    });
  }

  return next();
});

/**
 * Checks if the user is part of management.
 * Management includes the leadership team and leaders of other groups.
 * Should be used for event management features.
 */
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

/**
 * Checks if the user is part of the leadership.
 * Should be used for administrator menu access.
 */
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

/**
 * Checks if the user is allowed to edit the website.
 * Limited to labops, leadership, and admin groups.
 */
const protectedEditProcedure = protectedProcedure.use(async ({ next, ctx }) => {
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
  protectedEditProcedure,
};
