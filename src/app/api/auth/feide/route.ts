import { env } from '@/env';
import { validateFeideAuthorization } from '@/server/auth/feide';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookieStore = await cookies();
  const storedState = cookieStore.get('feide-state')?.value;
  const codeVerifier = cookieStore.get('feide-code-verifier')?.value;

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
  const userInfo = await userInfoResponse.json();
  console.log(userInfo);

  cookieStore.delete('feide-state');
  cookieStore.delete('feide-code-verifier');
}
