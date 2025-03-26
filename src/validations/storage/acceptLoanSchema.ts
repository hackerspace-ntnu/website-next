import { z } from 'zod';

function acceptLoanSchema() {
  return z.object({
    id: z.number().positive(),
    itemId: z.number().positive(),
    lenderId: z.number().positive(),
  });
}

export { acceptLoanSchema };
