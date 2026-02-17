import { on } from 'node:events';
import { TRPCError } from '@trpc/server';
import { desc } from 'drizzle-orm';
import { eventEmitter } from '@/lib/api/eventEmitter';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { coffeeScanner, doorStatus } from '@/server/db/tables';
import { addCoffeeEntrySchema } from '@/validations/coffee-scanner/addCoffeeEntrySchema';

const officeRouter = createRouter({
  fetchDoorStatus: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.doorStatus.findFirst({
      orderBy: [desc(doorStatus.createdAt)],
    });
  }),
});

const coffeeScanRouter = createRouter({
  scan: publicProcedure.subscription(async function* ({ signal }) {
    for await (const [data] of on(eventEmitter, 'updateCoffee', { signal })) {
      yield data;
    }
  }),
  tooMuchChocolate: publicProcedure.subscription(async function* ({ signal }) {
    for await (const [data] of on(eventEmitter, 'tooMuchChocolate', {
      signal,
    })) {
      yield data;
    }
  }),
  addCoffeeEntry: publicProcedure
    .input((input) =>
      addCoffeeEntrySchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const [created] = await ctx.db
        .insert(coffeeScanner)
        .values({
          drinkType: input.drinkType,
          isChocolate: input.isChocolate,
          cardId: input.cardId,
        })
        .returning({ coffeeEntryId: coffeeScanner.id });

      if (!created) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('coffeeScanner.api.addEntryFailed'),
          cause: { toast: 'error' },
        });
      }

      return;
    }),
});

export { officeRouter, coffeeScanRouter };
