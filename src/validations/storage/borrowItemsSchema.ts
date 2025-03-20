import { z } from 'zod';

function borrowItemsSchema() {
  return z.array(
    z.object({
      id: z.number(),
      amount: z.number().positive(),
      returnBy: z.date(),
    }),
  );
}

export { borrowItemsSchema };
