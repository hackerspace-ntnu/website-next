import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';

const testRouter = createRouter({
  helloWorld: publicProcedure.query(async ({ ctx }) => {
    // Dette er bare et eksempel, vi vil selfølgelig brukt ctx.t() istedet
    return ctx.locale === 'no' ? 'Hei Verden!' : 'Hello World!';
  }),
});

export { testRouter };
