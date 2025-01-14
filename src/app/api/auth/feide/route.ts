import { env } from '@/env';
import {
  type FeideUserInfo,
  validateFeideAuthorization,
} from '@/server/auth/feide';
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/server/auth/session';
import { createUser, getUserFromUsername } from '@/server/auth/user';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookieStore = await cookies();
  const storedState = cookieStore.get('feide-state')?.value;
  const codeVerifier = cookieStore.get('feide-code-verifier')?.value;
  cookieStore.delete('feide-state');
  cookieStore.delete('feide-code-verifier');

  if (!code || !state || !storedState || !codeVerifier) {
    return NextResponse.json(null, { status: 400 });
  }

  if (state !== storedState) {
    return NextResponse.json(null, { status: 403 });
  }

  const tokens = await validateFeideAuthorization(code, codeVerifier);
  if (!tokens) {
    return NextResponse.json(null, { status: 500 });
  }
  const userInfoResponse = await fetch(env.FEIDE_USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  if (!userInfoResponse.ok) {
    return NextResponse.json(null, { status: 500 });
  }

  const userInfo: FeideUserInfo = await userInfoResponse.json();
  const username = userInfo.email.split('@')[0];
  if (!userInfo || !username) {
    return NextResponse.json(null, { status: 500 });
  }

  let user = await getUserFromUsername(username);

  if (!user) {
    user = await createUser(username, userInfo.name, userInfo.email);

    if (!user) {
      return NextResponse.json(null, { status: 500 });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return NextResponse.redirect(new URL('/create-account', request.url));
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return NextResponse.redirect(new URL('/', request.url));
}
