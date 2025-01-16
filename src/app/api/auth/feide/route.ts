import { env } from '@/env';
import { checkEmailAvailability } from '@/server/auth/email';
import {
  type ExtendedFeideUserInfo,
  type FeideUserInfo,
  validateFeideAuthorization,
} from '@/server/auth/feide';
import { checkPhoneAvailability } from '@/server/auth/phone';
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/server/auth/session';
import { createUser, getUserFromUsername } from '@/server/auth/user';
import { insertUserSchema } from '@/validations/db';
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
  if (!userInfo) {
    return NextResponse.json(null, { status: 500 });
  }

  const username =
    userInfo['https://n.feide.no/claims/eduPersonPrincipalName'].split('@')[0];

  if (!username) {
    return NextResponse.json(null, { status: 500 });
  }

  let user = await getUserFromUsername(username);

  if (!user) {
    const extendedUserInfoResponse = await fetch(
      env.FEIDE_EXTENDED_USERINFO_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    if (!extendedUserInfoResponse.ok) {
      return NextResponse.json(null, { status: 500 });
    }

    const extendedUserInfo: ExtendedFeideUserInfo =
      await extendedUserInfoResponse.json();

    const isPhoneNumberAvailable = await checkPhoneAvailability(
      extendedUserInfo.mobile[0],
    );

    if (!isPhoneNumberAvailable) {
      return NextResponse.json(null, { status: 400 });
    }

    const isEmailAvailable = await checkEmailAvailability(userInfo.email);
    if (!isEmailAvailable) {
      return NextResponse.json(null, { status: 400 });
    }

    const birthDate = new Date(
      `${extendedUserInfo.norEduPersonBirthDate.slice(0, 4)}-${extendedUserInfo.norEduPersonBirthDate.slice(4, 6)}-${extendedUserInfo.norEduPersonBirthDate.slice(6, 8)}`,
    );
    const emailVerifiedAt = userInfo.email_verified ? new Date() : null;

    const userValues = {
      username: username,
      firstName: extendedUserInfo.givenName[0],
      lastName: extendedUserInfo.sn[0],
      email: userInfo.email,
      emailVerifiedAt,
      birthDate,
      phoneNumber: extendedUserInfo.mobile[0],
    };

    const insertUserSchemaResult = insertUserSchema.safeParse(userValues);

    if (!insertUserSchemaResult.success) {
      return NextResponse.json(null, { status: 500 });
    }
    user = await createUser(userValues);

    if (!user) {
      return NextResponse.json(null, { status: 500 });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return NextResponse.redirect(new URL('/auth/create-account', request.url));
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return NextResponse.redirect(new URL('/', request.url));
}
