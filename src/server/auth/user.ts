import { auth } from '@/server/auth';
import { cookies } from 'next/headers';
import { cache } from 'react';

const getUser = cache(async () => {
  const sessionId =
    (await cookies()).get(auth.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await auth.validateSession(sessionId);
  try {
    if (session?.fresh) {
      const sessionCookie = auth.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = auth.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user;
});

export { getUser };
