import { z } from 'zod';

function borrowItemsSchema() {
  return z.array(
    z.object({
      id: z.number(),
      amount: z.number().positive(),
      borrowFrom: z.date(),
      borrowUntil: z.date(),
      autoapprove: z.boolean(),
    }),
  );
}

export { borrowItemsSchema };
