import { env } from '@/env';
import { validateFeideAuthorizationCode } from '@/server/auth/feide';
import { type NextRequest, NextResponse } from 'next/server';
import { OAuth2RequestError } from 'oslo/oauth2';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json(null, { status: 400 });
  }
  try {
    const tokens = await validateFeideAuthorizationCode(code, state);
    if (!tokens) {
      return NextResponse.json(null, { status: 500 });
    }
    const userInfoResponse = await fetch(env.FEIDE_USERINFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const userInfo = await userInfoResponse.json();
  } catch (error) {
    // the specific error message depends on the provider
    if (error instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 401,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
