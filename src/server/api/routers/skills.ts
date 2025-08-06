import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';

const skillsRouter = createRouter({
  fetchAllSkills: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.skills.findMany();
  }),
});

export { skillsRouter };
