import { TRPCError } from '@trpc/server';
import { and, count, desc, eq } from 'drizzle-orm';
import z from 'zod';
import { useTranslationsFromContext } from '@/server/api/locale';
import { protectedProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { quoteLocalizations, quotes, users } from '@/server/db/tables';
import { createQuoteSchema } from '@/validations/quotes/createQuoteSchema';
import { fetchQuotesSchema } from '@/validations/quotes/fetchQuotesSchema';
import { updateQuoteSchema } from '@/validations/quotes/updateQuoteSchema';

const quotesRouter = createRouter({
  fetchQuotes: publicProcedure
    .input((input) =>
      fetchQuotesSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const { user } = await ctx.auth();
      const isMember = user?.groups && user.groups.length > 0;

      const quotesData = await ctx.db.query.quotes
        .findMany({
          where: !isMember ? eq(quotes.internal, false) : undefined,
          orderBy: desc(quotes.createdAt),
          limit: input.limit,
          offset: input.offset,
          with: {
            localizations: {
              where: eq(quoteLocalizations.locale, ctx.locale),
            },
            saidBy: true,
            heardBy: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.failedToFetchQuotes'),
            cause: { toast: 'error' },
          });
        });

      return quotesData.map((quote) => {
        const { localizations, ...rest } = quote;

        return {
          ...rest,
          localization: localizations[0],
        };
      });
    }),
  fetchQuote: publicProcedure
    .input((input) => z.number().parse(input))
    .query(async ({ ctx, input }) => {
      const quote = await ctx.db.query.quotes
        .findFirst({
          where: eq(quotes.id, input),
          with: {
            saidBy: true,
            heardBy: true,
            localizations: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.failedToFetchQuotes'),
            cause: { toast: 'error' },
          });
        });
      if (!quote) return null;

      const { user } = await ctx.auth();

      // Do not expose internal quotes if
      // the user does not have edit permissions,
      // and aren't involved in the quote
      if (
        quote.internal &&
        !user?.groups.some((g) =>
          ['labops', 'management', 'admin'].includes(g),
        ) &&
        quote.saidBy.id !== user?.id &&
        quote.heardBy.id !== user?.id
      ) {
        return null;
      }

      return quote;
    }),
  totalQuotesAvailable: publicProcedure.query(async ({ ctx }) => {
    const { user } = await ctx.auth();
    const isMember = user?.groups && user.groups.length > 0;

    const totalCount = await ctx.db
      .select({ count: count() })
      .from(quotes)
      .where(!isMember ? eq(quotes.internal, false) : undefined)
      .catch(() => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('quotes.api.failedToFetchQuotes'),
          cause: { toast: 'error' },
        });
      });

    if (!totalCount[0]) return Number.NaN;

    return totalCount[0].count;
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

      const [quote] = await ctx.db
        .insert(quotes)
        .values({
          internal: input.internal,
          saidBy: saidBy.id,
          heardBy: ctx.user.id,
        })
        .returning({ id: quotes.id })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.insertFailed'),
            cause: { toast: 'error' },
          });
        });

      if (!quote?.id) {
        console.error('No quote ID returned after insert');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('quotes.api.insertFailed'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .insert(quoteLocalizations)
        .values([
          {
            quoteId: quote.id,
            content: input.contentNorwegian,
            locale: 'nb-NO',
          },
          {
            quoteId: quote.id,
            content: input.contentEnglish,
            locale: 'en-GB',
          },
        ])
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.insertFailed'),
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
            message: ctx.t('quotes.api.failedToFetchQuotes'),
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
          ['labops', 'management', 'admin'].includes(g),
        ) &&
        quote.saidBy.id !== user?.id &&
        quote.heardBy.id !== user?.id
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: ctx.t('quotes.update.unauthorized'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .update(quotes)
        .set({
          internal: input.internal,
          saidBy: input.userId,
          heardBy: ctx.user.id,
        })
        .where(eq(quotes.id, input.quoteId))
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.updateFailed'),
            cause: { toast: 'error' },
          });
        });

      await ctx.db
        .update(quoteLocalizations)
        .set({
          content: input.contentNorwegian,
        })
        .where(
          and(
            eq(quoteLocalizations.quoteId, input.quoteId),
            eq(quoteLocalizations.locale, 'nb-NO'),
          ),
        )
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.updateFailed'),
            cause: { toast: 'error' },
          });
        });

      await ctx.db
        .update(quoteLocalizations)
        .set({
          content: input.contentEnglish,
        })
        .where(
          and(
            eq(quoteLocalizations.quoteId, input.quoteId),
            eq(quoteLocalizations.locale, 'en-GB'),
          ),
        )
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.updateFailed'),
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
            message: ctx.t('quotes.api.failedToFetchQuotes'),
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
          ['labops', 'management', 'admin'].includes(g),
        ) &&
        quote.saidBy.id !== user?.id &&
        quote.heardBy.id !== user?.id
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: ctx.t('quotes.delete.unauthorized'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .delete(quotes)
        .where(eq(quotes.id, input.quoteId))
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('quotes.api.deleteFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
});

export { quotesRouter };
