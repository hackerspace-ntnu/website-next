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

  if (
    !(
      env.FEIDE_CLIENT_ID &&
      env.FEIDE_CLIENT_SECRET &&
      env.FEIDE_AUTHORIZATION_ENDPOINT &&
      env.FEIDE_TOKEN_ENDPOINT &&
      env.FEIDE_USERINFO_ENDPOINT &&
      env.FEIDE_EXTENDED_USERINFO_ENDPOINT
    )
  ) {
    console.log(
      'Feide does not work since the Feide environment variables are not set',
    );
    return NextResponse.redirect(
      new URL('/auth?error=authenticationFailed', env.NEXT_PUBLIC_SITE_URL),
    );
  }

  if (!code || !state || !storedState || !codeVerifier) {
    console.error('Feide: Missing code, state, storedState or codeVerifier');
    return NextResponse.redirect(
      new URL('/auth?error=authenticationFailed', env.NEXT_PUBLIC_SITE_URL),
    );
  }

  if (state !== storedState) {
    console.error('Feide: State mismatch');
    return NextResponse.redirect(
      new URL('/auth?error=authenticationFailed', env.NEXT_PUBLIC_SITE_URL),
    );
  }

  const tokens = await validateFeideAuthorization(code, codeVerifier);
  if (!tokens) {
    console.error('Feide: Failed to validate authorization code');
    return NextResponse.redirect(
      new URL('/auth?error=authenticationFailed', env.NEXT_PUBLIC_SITE_URL),
    );
  }

  const userInfoResponse = await fetch(env.FEIDE_USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  if (!userInfoResponse.ok) {
    console.error('Feide: Failed to fetch user info');
    return NextResponse.redirect(
      new URL('/auth?error=userInfoFailed', env.NEXT_PUBLIC_SITE_URL),
    );
  }

  const userInfo: FeideUserInfo = await userInfoResponse.json();
  if (!userInfo) {
    console.error('Feide: User info missing');
    return NextResponse.redirect(
      new URL('/auth?error=userInfoMissing', env.NEXT_PUBLIC_SITE_URL),
    );
  }

  const username =
    userInfo['https://n.feide.no/claims/eduPersonPrincipalName'].split('@')[0];

  if (!username) {
    console.error('Feide: Username missing');
    return NextResponse.redirect(
      new URL('/auth?error=userInfoMissing', env.NEXT_PUBLIC_SITE_URL),
    );
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
      console.error('Feide: Failed to fetch extended user info');
      return NextResponse.redirect(
        new URL('/auth?error=userInfoFailed', env.NEXT_PUBLIC_SITE_URL),
      );
    }

    const extendedUserInfo: ExtendedFeideUserInfo =
      await extendedUserInfoResponse.json();

    const isPhoneNumberAvailable = await checkPhoneAvailability(
      extendedUserInfo.mobile[0],
    );

    if (!isPhoneNumberAvailable) {
      console.error('Feide: Phone number taken');
      return NextResponse.redirect(
        new URL('/auth?error=phoneTaken', env.NEXT_PUBLIC_SITE_URL),
      );
    }

    const isEmailAvailable = await checkEmailAvailability(userInfo.email);
    if (!isEmailAvailable) {
      console.error('Feide: Email taken');
      return NextResponse.redirect(
        new URL('/auth?error=emailTaken', env.NEXT_PUBLIC_SITE_URL),
      );
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
      console.error('Feide: Invalid user data');
      return NextResponse.redirect(
        new URL('/auth?error=invalidUserData', env.NEXT_PUBLIC_SITE_URL),
      );
    }
    user = await createUser(userValues);

    if (!user) {
      console.error('Feide: Failed to create user');
      return NextResponse.redirect(
        new URL('/auth?error=userCreationFailed', env.NEXT_PUBLIC_SITE_URL),
      );
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return NextResponse.redirect(
      new URL('/auth/create-account', env.NEXT_PUBLIC_SITE_URL),
    );
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return NextResponse.redirect(new URL('/', env.NEXT_PUBLIC_SITE_URL));
}
