import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

const testRouter = createTRPCRouter({
  helloWorld: publicProcedure.query(async () => {
    return 'Hello, World!';
  }),
});

export { testRouter };
