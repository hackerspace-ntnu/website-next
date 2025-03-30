import { z } from 'zod';

function itemsTotalSchema() {
  return z
    .object({
      categoryId: z.number(),
    })
    .optional();
}

export { itemsTotalSchema };
