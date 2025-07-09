import VerificationCodeEmail from '@/emails/VerificationCodeEmail';
import { env } from '@/env';
import type { routing } from '@/lib/locale';
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
import { sendEmail } from '@/server/services/emails';

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

async function getUserEmailVerificationRequestFromRequest(userId: number) {
  const cookieStore = await cookies();
  const id = cookieStore.get('email_verification')?.value ?? null;
  if (id === null) {
    return null;
  }
  const request = await getUserEmailVerificationRequest(userId, id);
  if (request === null) {
    await deleteEmailVerificationRequestCookie();
  }
  return request;
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

async function updateUserEmailAndSetEmailAsVerified(
  userId: number,
  email: string,
) {
  await db
    .update(users)
    .set({ email, emailVerifiedAt: new Date() })
    .where(eq(users.id, userId));
}

async function sendVerificationEmail(
  email: string,
  code: string,
  locale: (typeof routing.locales)[number],
  theme: 'dark' | 'light',
) {
  await sendEmail(
    VerificationCodeEmail,
    {
      locale,
      theme,
      publicSiteUrl: env.NEXT_PUBLIC_SITE_URL,
      validationCode: code,
    },
    locale === 'no'
      ? `Din Hackerspace NTNU bekreftelseskode er ${code}`
      : `Your Hackerspace NTNU confirmation code is ${code}`,
    email,
  );
}

export {
  sendVerificationEmailBucket,
  checkEmailAvailability,
  createEmailVerificationRequest,
  getUserEmailVerificationRequestFromRequest,
  deleteUserEmailVerificationRequest,
  setEmailVerificationRequestCookie,
  deleteEmailVerificationRequestCookie,
  updateUserEmailAndSetEmailAsVerified,
  sendVerificationEmail,
};
