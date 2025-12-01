import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  managementProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { skills, users, usersSkills } from '@/server/db/tables';
import { editSkillSchema } from '@/validations/management/editSkillSchema';
import { skillIdentifierSchema } from '@/validations/management/skillIdentifierSchema';
import { skillSchema } from '@/validations/management/skillSchema';
import { userToSkillSchema } from '@/validations/skills/userToSkillSchema';

const skillsRouter = createRouter({
  fetchAllSkills: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.skills.findMany();
  }),
  fetchSkill: publicProcedure
    .input((input) =>
      skillIdentifierSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.skills.findFirst({
        where: eq(skills.identifier, input),
      });
    }),
  createSkill: managementProcedure
    .input((input) => skillSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const existingSkill = await ctx.db.query.skills.findFirst({
        where: eq(skills.identifier, input.identifier),
      });

      if (existingSkill) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('skills.api.skillWithIdExists', {
            identifier: input.identifier,
          }),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(skills).values(input);
    }),
  editSkill: managementProcedure
    .input((input) =>
      editSkillSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.db.query.skills.findFirst({
        where: eq(skills.id, input.id),
      });

      if (!skill) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('skills.api.skillNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .update(skills)
        .set({
          identifier: input.identifier,
          nameNorwegian: input.nameNorwegian,
          nameEnglish: input.nameEnglish,
        })
        .where(eq(skills.id, input.id));
    }),
  deleteSkill: managementProcedure
    .input((input) =>
      skillIdentifierSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.db.query.skills.findFirst({
        where: eq(skills.identifier, input),
      });

      if (!skill) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('skills.api.skillNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.delete(skills).where(eq(skills.identifier, input));
    }),
  addSkillToUser: protectedProcedure
    .input((input) =>
      userToSkillSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const userSkillsData = await ctx.db.query.usersSkills.findMany({
        where: eq(usersSkills.userId, ctx.user.id),
      });

      // We can't add skills if we don't have the skill ourselves, unless we're management or admin
      if (
        !userSkillsData
          .map((userSkill) => userSkill.skillId)
          .includes(input.skillId) &&
        !ctx.user.groups.some(
          (group) => group === 'management' || group === 'admin',
        )
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: ctx.t('skills.api.cannotAddSkill'),
          cause: { toast: 'error' },
        });
      }

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

      const existingUserSkill = await ctx.db.query.usersSkills.findFirst({
        where: and(
          eq(usersSkills.skillId, input.skillId),
          eq(usersSkills.userId, input.userId),
        ),
      });

      if (existingUserSkill) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('skills.api.userAlreadyHasSkill'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(usersSkills).values({
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

      const existingUserSkill = await ctx.db.query.usersSkills.findFirst({
        where: and(
          eq(usersSkills.skillId, input.skillId),
          eq(usersSkills.userId, input.userId),
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
        .delete(usersSkills)
        .where(
          and(
            eq(usersSkills.skillId, input.skillId),
            eq(usersSkills.userId, input.userId),
          ),
        );
    }),
  fetchUserSkills: publicProcedure
    .input((input) =>
      userToSkillSchema(useTranslationsFromContext())
        .pick({ userId: true })
        .parse(input),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('members.api.errorFetchingMember'),
        });
      }

      return await ctx.db.query.usersSkills.findMany({
        where: eq(usersSkills.userId, input.userId),
        with: { skill: true },
      });
    }),
});

export { skillsRouter };
