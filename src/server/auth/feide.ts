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
    redirectURI: `${env.SITE_URL}/api/auth/feide`,
  },
);

function getFeideAuthorizationURL() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier(); // Optional for PKCE flow

  return feideOAuthClient.createAuthorizationURL({
    state,
    scopes: ['openid', 'profile', 'email'],
    codeVerifier,
  });
}

async function validateFeideAuthorizationCode(
  code: string,
  codeVerifier: string,
) {
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
    }
    console.error(error);
  }
}

export { getFeideAuthorizationURL, validateFeideAuthorizationCode };
