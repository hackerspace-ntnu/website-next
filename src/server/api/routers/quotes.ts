import { TRPCError } from '@trpc/server';
import { desc, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { protectedProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { quotes, users } from '@/server/db/tables';
import { createQuoteSchema } from '@/validations/quotes/createQuoteSchema';

const quotesRouter = createRouter({
  getQuotes: publicProcedure.query(async ({ ctx }) => {
    const { user } = await ctx.auth();
    const isMember = user?.groups && user.groups.length > 0;

    const query = ctx.db.query.quotes.findMany({
      where: !isMember ? eq(quotes.internal, false) : undefined,
      orderBy: desc(quotes.createdAt),
      with: {
        saidBy: true,
        heardBy: true,
      },
    });

    return await query.catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: ctx.t('quotes.api.failedToGetQuotes'),
        cause: { toast: 'error' },
      });
    });
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
});

export { quotesRouter };
