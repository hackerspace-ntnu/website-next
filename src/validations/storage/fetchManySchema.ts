import { z } from 'zod';

function fetchManySchema() {
  return z
    .object({
      limit: z.number().min(1).max(50),
      offset: z.number(),
    })
    .or(z.array(z.number()));
}

export { fetchManySchema };
