import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';

const testRouter = createRouter({
  helloWorld: publicProcedure.query(async ({ ctx }) => {
    return ctx.locale;
  }),
});

export { testRouter };
