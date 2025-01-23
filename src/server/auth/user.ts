import { db } from '@/server/db';
import { eq } from 'drizzle-orm';

import { type InsertUser, users } from '@/server/db/tables';

async function getUserFromUsername(username: string) {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
  });
}

async function createUser(userValues: InsertUser) {
  const [user] = await db.insert(users).values(userValues).returning();

  return user;
}

async function updateUserPassword(userId: number, passwordHash: string) {
  await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
}

export { getUserFromUsername, createUser, updateUserPassword };
