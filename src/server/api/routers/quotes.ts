import { TRPCError } from '@trpc/server';
import { desc, eq } from 'drizzle-orm';
import z from 'zod';
import { useTranslationsFromContext } from '@/server/api/locale';
import { protectedProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { quotes, users } from '@/server/db/tables';
import { createQuoteSchema } from '@/validations/quotes/createQuoteSchema';
import { updateQuoteSchema } from '@/validations/quotes/updateQuoteSchema';

const quotesRouter = createRouter({
  getQuotes: publicProcedure.query(async ({ ctx }) => {
    const { user } = await ctx.auth();
    const isMember = user?.groups && user.groups.length > 0;

    return await ctx.db.query.quotes
      .findMany({
        where: !isMember ? eq(quotes.internal, false) : undefined,
        orderBy: desc(quotes.createdAt),
        with: {
          saidBy: true,
          heardBy: true,
        },
      })
      .catch(() => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('quotes.api.failedToGetQuotes'),
          cause: { toast: 'error' },
        });
      });
  }),
  getQuote: publicProcedure
    .input((input) => z.number().parse(input))
    .query(async ({ ctx, input }) => {
      const quote = await ctx.db.query.quotes
        .findFirst({
          where: eq(quotes.id, input),
          with: {
            saidBy: true,
            heardBy: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.failedToGetQuotes'),
            cause: { toast: 'error' },
          });
        });
      if (!quote) return quote;

      const { user } = await ctx.auth();

      // Do not expose possibly internal quotes if
      // the user does not have edit permissions,
      // and aren't involved in the quote
      if (
        !user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
        ) &&
        quote.saidBy.id !== user?.id &&
        quote.heardBy.id !== user?.id
      ) {
        return null;
      }

      return quote;
    }),
  createQuote: protectedProcedure
    .input((input) =>
      createQuoteSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const [saidBy] = await ctx.db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.id, Number(input.userId)))
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('api.internalServerError'),
            cause: { toast: 'error' },
          });
        });

      if (!saidBy?.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('quotes.api.noUserWithUsername'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .insert(quotes)
        .values({
          contentNorwegian: input.contentNorwegian,
          contentEnglish: input.contentEnglish,
          internal: input.internal,
          saidBy: saidBy.id,
          heardBy: ctx.user.id,
        })
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('api.internalServerError'),
            cause: { toast: 'error' },
          });
        });
    }),
  updateQuote: protectedProcedure
    .input((input) =>
      updateQuoteSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const quote = await ctx.db.query.quotes
        .findFirst({
          where: eq(quotes.id, input.quoteId),
          with: {
            saidBy: true,
            heardBy: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.failedToGetQuotes'),
            cause: { toast: 'error' },
          });
        });

      if (!quote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('quotes.api.quoteNotFound'),
          cause: { toast: 'error' },
        });
      }

      const { user } = await ctx.auth();

      // Non-admin users can update quotes, so we need to have that
      // check here instead of using a more strict procedure
      if (
        !user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
        ) &&
        quote.saidBy.id !== user?.id &&
        quote.heardBy.id !== user?.id
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('quotes.update.unauthorized'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .update(quotes)
        .set({
          contentNorwegian: input.contentNorwegian,
          contentEnglish: input.contentEnglish,
          internal: input.internal,
          saidBy: input.userId,
          heardBy: ctx.user.id,
        })
        .where(eq(quotes.id, input.quoteId))
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('api.internalServerError'),
            cause: { toast: 'error' },
          });
        });
    }),
  deleteQuote: protectedProcedure
    .input((input) =>
      updateQuoteSchema(useTranslationsFromContext())
        .pick({ quoteId: true })
        .parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const quote = await ctx.db.query.quotes
        .findFirst({
          where: eq(quotes.id, input.quoteId),
          with: {
            saidBy: true,
            heardBy: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.failedToGetQuotes'),
            cause: { toast: 'error' },
          });
        });

      if (!quote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('quotes.api.quoteNotFound'),
          cause: { toast: 'error' },
        });
      }

      const { user } = await ctx.auth();

      // Non-admin users can update quotes, so we need to have that
      // check here instead of using a more strict procedure
      if (
        !user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
        ) &&
        quote.saidBy.id !== user?.id &&
        quote.heardBy.id !== user?.id
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('quotes.delete.unauthorized'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .delete(quotes)
        .where(eq(quotes.id, input.quoteId))
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('api.internalServerError'),
            cause: { toast: 'error' },
          });
        });
    }),
});

export { quotesRouter };
