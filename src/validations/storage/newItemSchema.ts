import { z } from 'zod';

function newItemSchema(categories: string[]) {
  return z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    description: z.string(),
    location: z.string().max(50),
    category:
      categories.length > 1
        ? z.enum(categories as [string, ...string[]])
        : z.literal(''),
    quantity: z.coerce.number().min(0),
  });
}

export { newItemSchema };
