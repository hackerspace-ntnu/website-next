import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';

const testRouter = createRouter({
  helloWorld: publicProcedure.query(async () => {
    return 'Hello, World!';
  }),
});

export { testRouter };
