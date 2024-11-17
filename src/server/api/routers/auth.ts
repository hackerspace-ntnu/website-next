import { env } from '@/env';
import { publicProcedure } from '@/server/api/procedures';
import { RefillingTokenBucket } from '@/server/api/rate-limit/refillingTokenBucket';
import { createRouter } from '@/server/api/trpc';
import { createFeideAuthorization } from '@/server/auth/feide';

import { TRPCError } from '@trpc/server';
import { cookies, headers } from 'next/headers';

const ipBucket = new RefillingTokenBucket<string>(5, 60);

const authRouter = createRouter({
  signInFeide: publicProcedure.mutation(async () => {
    const headerStore = await headers();
    const clientIP = headerStore.get('X-Forwarded-For');

    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Rate limit exceeded. Please try again later.',
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

    console.log(cookieStore.getAll());

    return url.href;
  }),
});

export { authRouter };
