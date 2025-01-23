import { env } from '@/env';
import { cookies } from 'next/headers';
import {
  OAuth2Client,
  OAuth2RequestError,
  generateCodeVerifier,
  generateState,
} from 'oslo/oauth2';

const feideOAuthClient = new OAuth2Client(
  env.FEIDE_CLIENT_ID ?? '',
  env.FEIDE_AUTHORIZATION_ENDPOINT ?? '',
  env.FEIDE_TOKEN_ENDPOINT ?? '',
  {
    redirectURI: `${env.NEXT_PUBLIC_SITE_URL}/api/auth/feide`,
  },
);

type FeideUserInfo = {
  aud: string;
  sub: string;
  'connect-userid_sec': [string];
  'dataporten-userid_sec': [string];
  'https://n.feide.no/claims/userid_sec': [string];
  'https://n.feide.no/claims/eduPersonPrincipalName': string;
  name: string;
  email: string;
  email_verified: boolean;
  picture: string;
};

type ExtendedFeideUserInfo = {
  cn: [string];
  displayName: string;
  eduPersonPrincipalName: string;
  givenName: [string];
  mail: [string];
  mobile: [string];
  norEduPersonBirthDate: string;
  norEduPersonLegalName: string;
  sn: [string];
  uid: [string];
};

async function createFeideAuthorization() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await feideOAuthClient.createAuthorizationURL({
    state,
    scopes: [
      'openid',
      'profile',
      'userinfo-name',
      'userid-feide',
      'email',
      'userinfo-mobile',
      'userinfo-photo',
      'userinfo-birthdate',
    ],
    codeVerifier,
  });
  return {
    state,
    codeVerifier,
    url,
  };
}

async function validateFeideAuthorization(code: string, codeVerifier: string) {
  console.log('Attempting direct token exchange');

  try {
    const response = await fetch('https://auth.dataporten.no/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${env.FEIDE_CLIENT_ID}:${env.FEIDE_CLIENT_SECRET}`,
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        code_verifier: codeVerifier,
        redirect_uri: `${env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/feide`,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Token exchange failed:', {
        status: response.status,
        statusText: response.statusText,
        error,
      });
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Direct token exchange error:', {
        message: error.message,
        cause: error.cause,
      });
      throw error;
    }
  }
}

async function setFeideAuthorizationCookies(
  state: string,
  codeVerifier: string,
) {
  const cookieStore = await cookies();
  cookieStore.set('feide-state', state, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 10,
    secure: env.NODE_ENV === 'production',
  });
  cookieStore.set('feide-code-verifier', codeVerifier, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 10,
    secure: env.NODE_ENV === 'production',
  });
}

export {
  createFeideAuthorization,
  validateFeideAuthorization,
  setFeideAuthorizationCookies,
  type FeideUserInfo,
  type ExtendedFeideUserInfo,
};
