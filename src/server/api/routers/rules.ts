import { TRPCError } from '@trpc/server';
import { and, asc, eq, or } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { ruleLocalizations, rules } from '@/server/db/tables';
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
          with: {
            localizations: true,
          },
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

      if (!rule) return null;

      if ((!session || !isMember) && rule.internal) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: ctx.t('rules.api.unauthorizedInternalRule'),
          cause: { toast: 'error' },
        });
      }

      return {
        ...rule,
        localization: rule.localizations.find(
          (loc) => loc.locale === ctx.locale,
        ),
      };
    }),
  fetchRules: publicProcedure.query(async ({ ctx }) => {
    const { user, session } = await ctx.auth();
    const isMember = user?.groups && user.groups.length > 0;

    const rulesData = await ctx.db.query.rules
      .findMany({
        where: !session || !isMember ? eq(rules.internal, false) : undefined,
        orderBy: asc(rules.createdAt),
        with: {
          localizations: {
            where: eq(ruleLocalizations.locale, ctx.locale),
          },
        },
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

    return rulesData.map((rule) => {
      const { localizations, ...ruleData } = rule;

      return {
        ...ruleData,
        localization: localizations[0],
      };
    });
  }),
  createRule: protectedEditProcedure
    .input((input) => ruleSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const existingRule = await ctx.db.query.ruleLocalizations.findFirst({
        where: or(
          eq(ruleLocalizations.name, input.nameNorwegian),
          eq(ruleLocalizations.name, input.nameEnglish),
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
        .values({ internal: input.internal, imageId })
        .returning({ id: rules.id })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('rules.api.insertFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });

      if (!rule) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('rules.api.insertFailed'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .insert(ruleLocalizations)
        .values([
          {
            ruleId: rule.id,
            name: input.nameNorwegian,
            content: input.contentNorwegian,
            locale: 'nb-NO',
          },
          {
            ruleId: rule.id,
            name: input.nameEnglish,
            content: input.contentEnglish,
            locale: 'en-GB',
          },
        ])
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('rules.api.insertFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
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

      const { image: _, ...data } = input;

      await ctx.db
        .update(rules)
        .set({
          internal: data.internal,
          updatedAt: new Date(),
          imageId: input.image ? imageId : existingRule.imageId,
        })
        .where(eq(rules.id, input.id));

      await ctx.db
        .update(ruleLocalizations)
        .set({
          name: data.nameEnglish,
          content: data.contentEnglish,
        })
        .where(
          and(
            eq(ruleLocalizations.ruleId, input.id),
            eq(ruleLocalizations.locale, 'en-GB'),
          ),
        )
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('rules.api.updateFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });

      await ctx.db
        .update(ruleLocalizations)
        .set({
          name: data.nameNorwegian,
          content: data.contentNorwegian,
        })
        .where(
          and(
            eq(ruleLocalizations.ruleId, input.id),
            eq(ruleLocalizations.locale, 'nb-NO'),
          ),
        )
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('rules.api.updateFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });

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
