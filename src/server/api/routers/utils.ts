import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { fileDirectories } from '@/lib/constants';
import {
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { getFileUrl, insertFile } from '@/server/services/files';

const utilsRouter = createRouter({
  getFileUrl: publicProcedure
    .input(
      z.object({
        fileId: z.number().positive(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        return await getFileUrl(input.fileId);
      } catch (error) {
        console.error('Error fetching file URL:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.noFileFound'),
          cause: { toast: 'error' },
        });
      }
    }),
  uploadFile: protectedEditProcedure
    .input(
      z.object({
        file: z.string(),
        directory: z.enum(fileDirectories),
        uploadToMatrix: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const file = await insertFile(
          input.file,
          input.directory,
          ctx.user.id,
          input.uploadToMatrix ?? false,
        );

        return {
          ...file,
          url: await getFileUrl(file.id),
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.fileUploadFailed'),
          cause: { toast: 'error' },
        });
      }
    }),
});

export { utilsRouter };
