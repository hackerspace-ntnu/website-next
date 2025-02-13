import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { getFileUrl } from '@/server/services/files';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const utilsRouter = createRouter({
  getFileUrl: publicProcedure
    .input(
      z.object({
        fileId: z.number().positive(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await getFileUrl(input.fileId);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.noFileFound'),
          cause: { toast: 'error' },
        });
      }
    }),
});

export { utilsRouter };
