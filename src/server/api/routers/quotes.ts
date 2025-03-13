import { useTranslationsFromContext } from '@/server/api/locale';
import { protectedProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { quotes, users } from '@/server/db/tables';
import { quoteSchema } from '@/validations/quotes/quoteSchema';
import { TRPCError } from '@trpc/server';
import { eq, sql } from 'drizzle-orm';

const quotesRouter = createRouter({
  getQuotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: quotes.id,
        createdAt: quotes.createdAt,
        content: quotes.content,
        author: sql`${users.firstName} || ' ' || ${users.lastName}`,
        profilePictureId: users.profilePictureId,
      })
      .from(quotes)
      .innerJoin(users, eq(users.id, quotes.author))
      .catch(() => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('quotes.failedToGetQuotes'),
          cause: { toast: 'error' },
        });
      });
  }),
  createQuote: protectedProcedure
    .input((input) => quoteSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input, ctx }) => {
      const [author] = await ctx.db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.username, input.username))
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('api.internalServerError'),
            cause: { toast: 'error' },
          });
        });

      if (!author?.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('quotes.failedToGetQuotes'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .insert(quotes)
        .values({
          content: input.content,
          author: author.id,
          createdBy: ctx.user.id,
        })
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
