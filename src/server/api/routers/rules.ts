import { TRPCError } from '@trpc/server';
import { asc, eq, or } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { rules } from '@/server/db/tables';
import { deleteFile, insertFile } from '@/server/services/files';
import { editRuleSchema } from '@/validations/rules/editRuleSchema';
import { fetchRuleSchema } from '@/validations/rules/fetchRuleSchema';
import { ruleSchema } from '@/validations/rules/ruleSchema';

const rulesRouter = createRouter({
  fetchRule: publicProcedure
    .input((input) =>
      fetchRuleSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const { user, session } = await ctx.auth();
      const isMember = user?.groups && user.groups.length > 0;

      const rule = await ctx.db.query.rules
        .findFirst({
          where: eq(rules.id, input),
        })
        .catch((error) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('rules.api.fetchRulesFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });

      if ((!session || !isMember) && rule?.internal) {
        throw new Error(ctx.t('rules.api.unauthorizedInternalRule'));
      }

      return rule;
    }),
  fetchRules: publicProcedure.query(async ({ ctx }) => {
    const { user, session } = await ctx.auth();
    const isMember = user?.groups && user.groups.length > 0;

    return await ctx.db.query.rules
      .findMany({
        where: !session || !isMember ? eq(rules.internal, false) : undefined,
        orderBy: asc(rules.createdAt),
      })
      .catch((error) => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('rules.api.fetchRulesFailed', {
            error: error.message,
          }),
          cause: { toast: 'error' },
        });
      });
  }),
  newRule: protectedEditProcedure
    .input((input) => ruleSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const existingRule = await ctx.db.query.rules.findFirst({
        where: or(
          eq(rules.nameNorwegian, input.nameNorwegian),
          eq(rules.nameEnglish, input.nameEnglish),
        ),
      });

      if (existingRule) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('rules.api.ruleWithNameExists', {
            name:
              ctx.locale === 'en-GB' ? input.nameEnglish : input.nameNorwegian,
          }),
          cause: { toast: 'error' },
        });
      }

      let imageId: number | null = null;

      if (input.image) {
        const file = await insertFile(input.image, 'rules', ctx.user.id, false);
        imageId = file.id;
      }

      const [rule] = await ctx.db
        .insert(rules)
        .values({ ...input, imageId })
        .returning({ id: rules.id });

      if (!rule)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('rules.api.insertFailed'),
          cause: { toast: 'error' },
        });

      return rule.id;
    }),
  editRule: protectedEditProcedure
    .input((input) => editRuleSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const existingRule = await ctx.db.query.rules.findFirst({
        where: eq(rules.id, input.id),
      });

      if (!existingRule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('rules.api.ruleNotFound'),
          cause: { toast: 'error' },
        });
      }

      let imageId: number | null = null;

      if (input.image) {
        if (existingRule?.imageId) {
          await deleteFile(existingRule.imageId);
        }

        const file = await insertFile(input.image, 'rules', ctx.user.id, false);
        imageId = file.id;
      }

      const { image: _, ...rest } = input;

      await ctx.db
        .update(rules)
        .set({
          ...rest,
          updatedAt: new Date(),
          imageId: input.image ? imageId : existingRule.imageId,
        })
        .where(eq(rules.id, input.id));

      return input.id;
    }),
  deleteRuleImage: protectedEditProcedure
    .input((input) =>
      editRuleSchema(useTranslationsFromContext())
        .pick({ id: true })
        .parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const rule = await ctx.db.query.rules.findFirst({
        where: eq(rules.id, input.id),
      });

      if (!rule || !rule.imageId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('rules.api.ruleNotFound'),
          cause: { toast: 'error' },
        });
      }

      await deleteFile(rule.imageId);
    }),
  deleteRule: protectedEditProcedure
    .input((input) =>
      editRuleSchema(useTranslationsFromContext())
        .pick({ id: true })
        .parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const rule = await ctx.db.query.rules.findFirst({
        where: eq(rules.id, input.id),
      });

      if (!rule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('rules.api.ruleNotFound'),
          cause: { toast: 'error' },
        });
      }

      if (rule.imageId) {
        await deleteFile(rule.imageId);
      }

      await ctx.db.delete(rules).where(eq(rules.id, input.id));
    }),
});

export { rulesRouter };
