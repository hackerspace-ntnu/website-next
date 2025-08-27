import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { skills } from '@/server/db/tables';
import { editSkillSchema } from '@/validations/management/editSkillSchema';
import { skillIdSchema } from '@/validations/management/skillIdSchema';
import { skillSchema } from '@/validations/management/skillSchema';

const skillsRouter = createRouter({
  fetchAllSkills: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.skills.findMany();
  }),
  fetchSkill: publicProcedure
    .input((input) => skillIdSchema(useTranslationsFromContext()).parse(input))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.skills.findFirst({
        where: eq(skills.id, input),
      });
    }),
  createSkill: protectedEditProcedure
    .input((input) => skillSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const existingSkill = await ctx.db.query.skills.findFirst({
        where: eq(skills.identifier, input.identifier),
      });

      if (existingSkill) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('management.skills.api.skillWithIdExists', {
            identifier: input.identifier,
          }),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(skills).values(input);
    }),
  editSkill: protectedEditProcedure
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
          message: ctx.t('management.skills.api.skillNotFound'),
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
  deleteSkill: protectedEditProcedure
    .input((input) => skillIdSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.db.query.skills.findFirst({
        where: eq(skills.id, input),
      });

      if (!skill) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('management.skills.api.skillNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.delete(skills).where(eq(skills.id, input));
    }),
});

export { skillsRouter };
