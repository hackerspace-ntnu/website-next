import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

const testRouter = createTRPCRouter({
  newCofee: publicProcedure.query(async ({ ctx }) => {}),
});

export { testRouter };
