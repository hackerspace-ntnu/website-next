import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { posts } from '@/server/db/schema';

const testRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),
});

export { testRouter };
