import { env } from '@/env';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { RefillingTokenBucket } from '@/server/api/rate-limit/refillingTokenBucket';
import { Throttler } from '@/server/api/rate-limit/throttler';
import { createRouter } from '@/server/api/trpc';
import { createFeideAuthorization } from '@/server/auth/feide';
import { verifyPasswordHash } from '@/server/auth/password';
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from '@/server/auth/session';
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/server/auth/session';
import { getUserFromUsername } from '@/server/auth/user';
import { accountSignInSchema } from '@/validations/auth/accountSignInSchema';

import { TRPCError } from '@trpc/server';
import { cookies, headers } from 'next/headers';

import { sanitizeAuth } from '@/server/auth';

const ipBucket = new RefillingTokenBucket<string>(5, 60);
const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300]);

const authRouter = createRouter({
  state: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.auth();
    return sanitizeAuth(result);
  }),
  signInFeide: publicProcedure.mutation(async () => {
    const headerStore = await headers();
    const clientIP = headerStore.get('X-Forwarded-For');

    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: ctx.t('api.tooManyRequests'),
      });
    }

    const cookieStore = await cookies();
    const { state, codeVerifier, url } = await createFeideAuthorization();
    cookieStore.set('feide-state', state, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 10,
      secure: env.NODE_ENV === 'production',
    });
    cookieStore.set('feide-code-verifier', codeVerifier, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 10,
      secure: env.NODE_ENV === 'production',
    });

    return url.href;
  }),
  signIn: publicProcedure
    .input(accountSignInSchema())
    .mutation(async ({ input, ctx }) => {
      const headerStore = await headers();
      const clientIP = headerStore.get('X-Forwarded-For');

      if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }
      const user = await getUserFromUsername(input.username);
      if (!user || !user.passwordHash) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'auth.invalidCredentials',
        });
      }

      if (!throttler.consume(user.id)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }

      const validPassword = await verifyPasswordHash(
        user.passwordHash,
        input.password,
      );
      if (!validPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: ctx.t('auth.invalidCredentials'),
        });
      }
      throttler.reset(user.id);

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, user.id);
      await setSessionTokenCookie(sessionToken, session.expiresAt);
    }),
  signOut: authenticatedProcedure.mutation(async ({ ctx }) => {
    await invalidateSession(ctx.session.id);
    await deleteSessionTokenCookie();
  }),
});

export { authRouter };
