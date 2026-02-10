import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { printerSpecs, toolLocalizations, tools } from '@/server/db/tables';
import { deleteFile, insertFile } from '@/server/services/files';
import { fetchToolSchema } from '@/validations/reservations';
import { editToolSchema } from '@/validations/reservations/tools/editToolSchema';
import { toolSchema } from '@/validations/reservations/tools/toolSchema';

const toolsRouter = createRouter({
  fetchTool: publicProcedure
    .input((input) =>
      fetchToolSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input, ctx }) => {
      const tool = await ctx.db.query.tools
        .findFirst({
          where: eq(tools.id, input),
          with: {
            localizations: true,
            printerSpec: true,
          },
        })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: ctx.t('reservations.api.fetchReservationsFailed'),
            cause: { toast: error },
          });
        });

      if (!tool) return null;

      return {
        ...tool,
        name:
          tool?.localizations.find((l) => l.locale === ctx.locale)?.name ??
          null,
      };
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
        filamentSize: printerSpecs.filamentSize,
        filamentType: printerSpecs.filamentType,
        slicer: printerSpecs.slicer,
      })
      .from(tools)
      .leftJoin(
        toolLocalizations,
        and(
          eq(toolLocalizations.toolId, tools.id),
          eq(toolLocalizations.locale, ctx.locale),
        ),
      )
      .leftJoin(printerSpecs, eq(printerSpecs.printerId, tools.id))
      .orderBy(tools.id);

    return allTools;
  }),
  createTool: protectedEditProcedure
    .input((input) => toolSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.transaction(async (tx) => {
        let imageId: number | null = null;

        if (input.image) {
          const file = await insertFile(
            input.image,
            'tools',
            ctx.user.id,
            false,
          );
          imageId = file.id;
        }

        const [tool] = await tx
          .insert(tools)
          .values({ ...input, imageId })
          .returning({ id: tools.id })
          .catch((error) => {
            console.error(error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: ctx.t('reservations.api.createToolFailed'),
              cause: { toast: error },
            });
          });

        if (!tool) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('reservations.api.createToolFailed'),
          });
        }

        await tx
          .insert(toolLocalizations)
          .values([
            {
              toolId: tool.id,
              name: input.nameEnglish,
              description: input.descriptionEnglish,
              locale: 'en-GB',
            },
            {
              toolId: tool.id,
              name: input.nameNorwegian,
              description: input.descriptionNorwegian,
              locale: 'nb-NO',
            },
          ])
          .catch((error) => {
            console.error(error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: ctx.t('reservations.api.createToolFailed'),
              cause: { toast: error },
            });
          });

        if (input.type === '3dprinter') {
          await tx
            .insert(printerSpecs)
            .values({
              printerId: tool.id,
              filamentSize: input.filamentSize,
              filamentType: input.filamentType,
              slicer: input.slicer,
            })
            .catch((error) => {
              console.error(error);
              throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: ctx.t('reservations.api.createToolFailed'),
                cause: { toast: error },
              });
            });
        }

        return tool.id;
      });
    }),
  editTool: protectedEditProcedure
    .input((input) => editToolSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.transaction(async (tx) => {
        const existingTool = await tx.query.tools
          .findFirst({
            where: eq(tools.id, input.id),
          })
          .catch((error) => {
            console.error(error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: ctx.t('reservations.api.editToolFailed'),
              cause: { toast: error },
            });
          });

        if (!existingTool) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('reservations.api.toolNotFound'),
          });
        }

        let imageId: number | null = null;

        if (input.image) {
          if (existingTool?.imageId) {
            await deleteFile(existingTool.imageId);
          }

          const file = await insertFile(
            input.image,
            'tools',
            ctx.user.id,
            false,
          );
          imageId = file.id;
        }

        await tx
          .update(tools)
          .set({ ...input, imageId: input.image ? imageId : undefined })
          .where(eq(tools.id, input.id))
          .catch((error) => {
            console.error(error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: ctx.t('reservations.api.editToolFailed'),
              cause: { toast: error },
            });
          });

        await tx
          .update(toolLocalizations)
          .set({
            name: input.nameEnglish,
            description: input.descriptionEnglish,
          })
          .where(
            and(
              eq(toolLocalizations.toolId, input.id),
              eq(toolLocalizations.locale, 'en-GB'),
            ),
          )
          .catch((error) => {
            console.error(error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: ctx.t('reservations.api.editToolFailed'),
              cause: { toast: error },
            });
          });

        await tx
          .update(toolLocalizations)
          .set({
            name: input.nameNorwegian,
            description: input.descriptionNorwegian,
          })
          .where(
            and(
              eq(toolLocalizations.toolId, input.id),
              eq(toolLocalizations.locale, 'nb-NO'),
            ),
          )
          .catch((error) => {
            console.error(error);
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: ctx.t('reservations.api.editToolFailed'),
              cause: { toast: error },
            });
          });

        if (input.type === '3dprinter') {
          // The printer spec might exist, but not necessarily. Create it if necessary.
          await tx
            .insert(printerSpecs)
            .values({
              printerId: input.id,
              filamentSize: input.filamentSize,
              filamentType: input.filamentType,
              slicer: input.slicer,
            })
            .onConflictDoUpdate({
              target: printerSpecs.printerId,
              set: {
                filamentSize: input.filamentSize,
                filamentType: input.filamentType,
                slicer: input.slicer,
              },
            })
            .catch((error) => {
              console.error(error);
              throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: ctx.t('reservations.api.createToolFailed'),
                cause: { toast: error },
              });
            });
        } else {
          await tx
            .delete(printerSpecs)
            .where(eq(printerSpecs.printerId, input.id));
        }

        return input.id;
      });
    }),
  deleteToolImage: protectedEditProcedure
    .input((input) =>
      editToolSchema(useTranslationsFromContext())
        .pick({ id: true })
        .parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const tool = await ctx.db.query.tools
        .findFirst({
          where: eq(tools.id, input.id),
        })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: ctx.t('reservations.api.fetchReservationsFailed'),
            cause: { toast: error },
          });
        });

      if (!tool || !tool.imageId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('reservations.api.toolNotFound'),
        });
      }

      await deleteFile(tool.imageId);
      return input.id;
    }),
  deleteTool: protectedEditProcedure
    .input((input) =>
      editToolSchema(useTranslationsFromContext())
        .pick({ id: true })
        .parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const tool = await ctx.db.query.tools.findFirst({
        where: eq(tools.id, input.id),
      });

      if (!tool) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('reservations.api.toolNotFound'),
          cause: { toast: 'error' },
        });
      }

      if (tool.imageId) {
        await deleteFile(tool.imageId);
      }

      await ctx.db.delete(tools).where(eq(tools.id, input.id));
      return input.id;
    }),
});

export { toolsRouter };
