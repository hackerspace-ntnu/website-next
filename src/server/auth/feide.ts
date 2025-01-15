import { env } from '@/env';
import {
  OAuth2Client,
  OAuth2RequestError,
  generateCodeVerifier,
  generateState,
} from 'oslo/oauth2';

const feideOAuthClient = new OAuth2Client(
  env.FEIDE_CLIENT_ID,
  env.FEIDE_AUTHORIZATION_ENDPOINT,
  env.FEIDE_TOKEN_ENDPOINT,
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
  try {
    const tokens = await feideOAuthClient.validateAuthorizationCode(code, {
      codeVerifier,
      credentials: env.FEIDE_CLIENT_SECRET,
      authenticateWith: 'request_body',
    });
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      // probably invalid credentials etc
      // will be handled by returning null
    }
    console.error(error);
  }
}

export {
  createFeideAuthorization,
  validateFeideAuthorization,
  type FeideUserInfo,
  type ExtendedFeideUserInfo,
};
