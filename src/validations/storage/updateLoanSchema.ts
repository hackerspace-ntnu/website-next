import { z } from 'zod';

function updateLoanSchema() {
  return z.object({
    loanId: z.number().positive(),
    itemId: z.number().positive(),
    lenderId: z.number().positive(),
  });
}

export { updateLoanSchema };
