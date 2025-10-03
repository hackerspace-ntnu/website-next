import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { printerSpecs, toolLocalizations, tools } from '@/server/db/tables';
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
          name: toolLocalizations.name,
          nickName: tools.nickName,
        })
        .from(tools)
        .leftJoin(
          toolLocalizations,
          and(
            eq(toolLocalizations.toolId, tools.id),
            eq(toolLocalizations.locale, ctx.locale),
          ),
        )
        .where(and(eq(tools.id, input), eq(tools.status, 'available')))
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

  fetchTools: publicProcedure.query(async ({ ctx }) => {
    const allTools = await ctx.db
      .select({
        toolId: tools.id,
        type: tools.type,
        name: toolLocalizations.name,
        nickName: tools.nickName,
        description: toolLocalizations.description,
        difficulty: tools.difficulty,
        requires: tools.requires,
        imageId: tools.imageId,
        status: tools.status,
      })
      .from(tools)
      .leftJoin(
        toolLocalizations,
        and(
          eq(toolLocalizations.toolId, tools.id),
          eq(toolLocalizations.locale, ctx.locale),
        ),
      )
      .leftJoin(printerSpecs, eq(printerSpecs.printerId, tools.id));

    return allTools;
  }),
});

export { toolsRouter };
