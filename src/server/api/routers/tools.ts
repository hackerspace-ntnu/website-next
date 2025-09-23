import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { tools, toolsLocalizations } from '@/server/db/tables';
import { fetchToolSchema } from '@/validations/reservations';

const toolsRouter = createRouter({
  fetchTool: publicProcedure
    .input((input) =>
      fetchToolSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input, ctx }) => {
      const tool = await ctx.db
        .select({
          id: tools.id,
          name: toolsLocalizations.name,
          nickName: tools.nickName,
        })
        .from(tools)
        .leftJoin(
          toolsLocalizations,
          and(
            eq(toolsLocalizations.toolId, tools.id),
            eq(toolsLocalizations.locale, ctx.locale),
          ),
        )
        .where(and(eq(tools.id, input), eq(tools.available, true)))
        .limit(1)
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: ctx.t('reservations.api.fetchReservationsFailed'),
            cause: { toast: error },
          });
        });
      return tool[0];
    }),
});

export { toolsRouter };
