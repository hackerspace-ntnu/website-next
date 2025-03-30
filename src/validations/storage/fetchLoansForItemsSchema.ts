import { z } from 'zod';

function fetchLoansForItemsSchema() {
  return z.array(z.number());
}

export { fetchLoansForItemsSchema };
