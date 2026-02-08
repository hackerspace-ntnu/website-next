import { on } from 'node:events';
import { desc } from 'drizzle-orm';
import { eventEmitter } from '@/lib/api/eventEmitter';
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

const coffeeScanRouter = createRouter({
  scan: publicProcedure.subscription(async function* ({ signal }) {
    for await (const [data] of on(eventEmitter, 'updateCoffee', { signal })) {
      yield data;
    }
  }),
});

export { officeRouter, coffeeScanRouter };
