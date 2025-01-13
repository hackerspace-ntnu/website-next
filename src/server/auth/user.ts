import { db } from '@/server/db';
import { eq } from 'drizzle-orm';

import { users } from '@/server/db/tables';

async function getUserFromEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

async function createUser(username: string, name: string, email: string) {
  const [user] = await db
    .insert(users)
    .values({ username, name, email })
    .returning();

  return user;
}

export { getUserFromEmail, createUser };
