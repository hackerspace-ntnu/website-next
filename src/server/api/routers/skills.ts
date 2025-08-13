import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { managementProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { skills, userSkills, users } from '@/server/db/tables';
import { userToSkillSchema } from '@/validations/skills/userToSkillSchema';

const skillsRouter = createRouter({
  fetchAllSkills: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.skills.findMany();
  }),
  addSkillToUser: managementProcedure
    .input((input) =>
      userToSkillSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.db.query.skills.findFirst({
        where: eq(skills.id, input.skillId),
      });

      if (!skill) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('skills.api.skillNotFound'),
          cause: { toast: 'error' },
        });
      }

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('members.api.errorFetchingMember'),
          cause: { toast: 'error' },
        });
      }

      const existingUserSkill = await ctx.db.query.userSkills.findFirst({
        where: and(
          eq(userSkills.skillId, input.skillId),
          eq(userSkills.userId, input.userId),
        ),
      });

      if (existingUserSkill) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('skills.api.userAlreadyHasSkill'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(userSkills).values({
        skillId: input.skillId,
        userId: input.userId,
      });
    }),
  removeSkillFromUser: managementProcedure
    .input((input) =>
      userToSkillSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.db.query.skills.findFirst({
        where: eq(skills.id, input.skillId),
      });

      if (!skill) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('skills.api.skillNotFound'),
          cause: { toast: 'error' },
        });
      }

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('members.api.errorFetchingMember'),
          cause: { toast: 'error' },
        });
      }

      const existingUserSkill = await ctx.db.query.userSkills.findFirst({
        where: and(
          eq(userSkills.skillId, input.skillId),
          eq(userSkills.userId, input.userId),
        ),
      });

      if (!existingUserSkill) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('skills.api.userDoesNotHaveSkill'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .delete(userSkills)
        .where(
          and(
            eq(userSkills.skillId, input.skillId),
            eq(userSkills.userId, input.userId),
          ),
        );
    }),
});

export { skillsRouter };
