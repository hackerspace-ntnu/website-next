import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';

const counterRouter = createRouter({
  count: publicProcedure.subscription(async function* () {
    let count = 0;

    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      count++;
      yield count;
    }
  }),
});

export { counterRouter };
