import { env } from '@/env';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { RefillingTokenBucket } from '@/server/api/rate-limit/refillingTokenBucket';
import { createRouter } from '@/server/api/trpc';
import { createFeideAuthorization } from '@/server/auth/feide';
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from '@/server/auth/session';
import { getTranslations } from 'next-intl/server';

import { TRPCError } from '@trpc/server';
import { cookies, headers } from 'next/headers';

import { sanitizeAuth } from '@/server/auth';

const ipBucket = new RefillingTokenBucket<string>(5, 60);

const authRouter = createRouter({
  state: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.auth();
    return sanitizeAuth(result);
  }),
  signInFeide: publicProcedure.mutation(async ({ ctx }) => {
    const t = await getTranslations({
      locale: ctx.locale,
      namespace: 'api',
    });

    const headerStore = await headers();
    const clientIP = headerStore.get('X-Forwarded-For');

    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: t('tooManyRequests'),
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
  signOut: authenticatedProcedure.mutation(async ({ ctx }) => {
    await invalidateSession(ctx.session.id);
    await deleteSessionTokenCookie();
  }),
});

export { authRouter };
