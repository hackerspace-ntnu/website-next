import { db } from '@/server/db';
import { eq } from 'drizzle-orm';

import { users } from '@/server/db/tables';

async function checkEmailAvailability(email: string) {
  const rows = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email));
  return rows.length === 0;
}

export { checkEmailAvailability };
