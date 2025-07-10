import { z } from 'zod';

function deleteItemSchema() {
  return z.object({
    id: z.number(),
  });
}

export { deleteItemSchema };
