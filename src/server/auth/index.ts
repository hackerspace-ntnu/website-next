import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { db } from '@/server/db';
import { groups, sessions, users, usersGroups } from '@/server/db/tables';

async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({
      user: users,
      session: sessions,
      groups: groups.identifier,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .leftJoin(usersGroups, eq(users.id, usersGroups.userId))
    .leftJoin(groups, eq(usersGroups.groupId, groups.id))
    .where(eq(sessions.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const firstResult = result[0];
  if (!firstResult) {
    return { session: null, user: null };
  }

  const { session } = firstResult;
  const groupIdentifiers = result
    .map((r) => r.groups)
    .filter((g) => g !== null);

  const user = {
    ...firstResult.user,
    groups: groupIdentifiers,
  };

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessions.id, session.id));
  }

  return { session, user };
}

const auth = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = await validateSessionToken(token);
  return result;
});

function sanitizeAuth(auth: Awaited<ReturnType<typeof validateSessionToken>>) {
  const { user, session } = auth;

  const sanitizedUser = user ? { ...user, passwordHash: undefined } : null;

  return { user: sanitizedUser, session };
}

export { auth, validateSessionToken, sanitizeAuth };
