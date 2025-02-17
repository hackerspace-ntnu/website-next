import { env } from '@/env';
import { ExpiringTokenBucket } from '@/server/api/rate-limit/expiringTokenBucket';
import { generateRandomOTP } from '@/server/auth/code';
import { db } from '@/server/db';
import { encodeBase32 } from '@oslojs/encoding';
import { and, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

import {
  type SelectEmailVerificationRequest,
  emailVerificationRequests,
  users,
} from '@/server/db/tables';

const sendVerificationEmailBucket = new ExpiringTokenBucket(3, 600);

async function checkEmailAvailability(email: string) {
  const rows = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email));
  return rows.length === 0;
}

async function getUserEmailVerificationRequest(userId: number, id: string) {
  return await db.query.emailVerificationRequests.findFirst({
    where: and(
      eq(emailVerificationRequests.userId, userId),
      eq(emailVerificationRequests.id, id),
    ),
  });
}

async function deleteUserEmailVerificationRequest(userId: number) {
  await db
    .delete(emailVerificationRequests)
    .where(eq(emailVerificationRequests.userId, userId));
}

async function createEmailVerificationRequest(userId: number, email: string) {
  await deleteUserEmailVerificationRequest(userId);
  const idBytes = new Uint8Array(20);
  crypto.getRandomValues(idBytes);
  const id = encodeBase32(idBytes).toLowerCase();

  const code = generateRandomOTP();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  const [result] = await db
    .insert(emailVerificationRequests)
    .values({
      id,
      userId,
      code,
      email,
      expiresAt,
    })
    .returning();

  return result;
}

async function setEmailVerificationRequestCookie(
  request: SelectEmailVerificationRequest,
) {
  const cookieStore = await cookies();
  cookieStore.set('email_verification', request.id, {
    httpOnly: true,
    path: '/',
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: request.expiresAt,
  });
}

async function deleteEmailVerificationRequestCookie() {
  const cookieStore = await cookies();
  cookieStore.set('email_verification', '', {
    httpOnly: true,
    path: '/',
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
  });
}

export {
  sendVerificationEmailBucket,
  checkEmailAvailability,
  createEmailVerificationRequest,
  deleteUserEmailVerificationRequest,
  setEmailVerificationRequestCookie,
  deleteEmailVerificationRequestCookie,
};
