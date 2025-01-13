import { eq } from 'drizzle-orm';

import type { TRPCContext } from '@/server/api/context';
import { users } from '@/server/db/tables';

async function getUserFromEmail(email: string, context: TRPCContext) {
  return await context.db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

export { getUserFromEmail };
