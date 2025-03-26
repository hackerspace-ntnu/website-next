import { z } from 'zod';

function fetchLoansSchema() {
  return z.object({
    limit: z.number().min(1).max(50),
    offset: z.number(),
    pending: z.boolean().optional(),
  });
}

export { fetchLoansSchema };
