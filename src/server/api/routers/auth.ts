import { publicProcedure } from '@/server/api/procedures';
import { RefillingTokenBucket } from '@/server/api/rate-limit/refillingTokenBucket';
import { createRouter } from '@/server/api/trpc';
import { getFeideAuthorizationUrl } from '@/server/auth/feide';

import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';

const ipBucket = new RefillingTokenBucket<string>(5, 60);

const authRouter = createRouter({
  getFeideUrlHref: publicProcedure.query(async () => {
    const headerStore = await headers();
    const clientIP = headerStore.get('X-Forwarded-For');

    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Rate limit exceeded. Please try again later.',
        data: {
          toast: 'error',
        },
      });
    }
    const feideUrl = await getFeideAuthorizationUrl();
    return feideUrl.href;
  }),
});

export { authRouter };
