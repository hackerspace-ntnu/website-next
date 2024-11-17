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
  console.log('step 1');
  console.log(code, state, storedState, codeVerifier);

  if (!code || !state || !storedState || !codeVerifier) {
    return NextResponse.json(null, { status: 400 });
  }

  console.log('step 2');
  if (state !== storedState) {
    return NextResponse.json(null, { status: 403 });
  }

  console.log('step 3');
  const tokens = await validateFeideAuthorization(code, codeVerifier);
  if (!tokens) {
    return NextResponse.json(null, { status: 500 });
  }
  console.log('step 4');
  const userInfoResponse = await fetch(env.FEIDE_USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  console.log('step 5');
  const userInfo = await userInfoResponse.json();
  console.log(userInfo);
  return new Response(null, {
    status: 500,
  });
}
