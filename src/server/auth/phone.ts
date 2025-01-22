import { db } from '@/server/db';
import { eq } from 'drizzle-orm';

import { users } from '@/server/db/tables';

async function checkPhoneAvailability(phoneNumber: string) {
  const rows = await db
    .select({ phoneNumber: users.phoneNumber })
    .from(users)
    .where(eq(users.phoneNumber, phoneNumber));

  return rows.length === 0;
}

export { checkPhoneAvailability };
