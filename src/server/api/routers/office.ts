import { desc } from 'drizzle-orm';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { doorStatus } from '@/server/db/tables';

const officeRouter = createRouter({
  fetchDoorStatus: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.doorStatus.findFirst({
      orderBy: [desc(doorStatus.createdAt)],
    });
  }),
});

export { officeRouter };
