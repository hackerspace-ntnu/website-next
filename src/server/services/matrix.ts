import { env } from '@/env';
import { hmac } from '@oslojs/crypto/hmac';
import { SHA1 } from '@oslojs/crypto/sha1';

function isMatrixConfigured() {
  return (
    env.MATRIX_SERVER_NAME &&
    env.MATRIX_ENDPOINT &&
    env.MATRIX_SECRET &&
    env.MATRIX_ADMIN_USERNAME &&
    env.MATRIX_ADMIN_PASSWORD &&
    env.NEXT_PUBLIC_MATRIX_CLIENT_URL
  );
}

function getMatrixUsername(username: string) {
  return `@${username}:${env.MATRIX_SERVER_NAME}`;
}

function getMxcUrl(matrixMediaId: string) {
  return `mxc://${env.MATRIX_SERVER_NAME}/${matrixMediaId}`;
}

function getMatrixMediaId(mxcUrl: string) {
  return mxcUrl.match(/^mxc:\/\/.*?\/(.+)$/)?.[1] ?? null;
}

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

async function getMatrixAccessToken() {
  if (!isMatrixConfigured()) {
    throw new Error('Matrix environment variables are not configured');
  }

  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const headers = {
      'content-type': 'application/json',
    };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_matrix/client/v3/login`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          type: 'm.login.password',
          identifier: {
            type: 'm.id.user',
            user: env.MATRIX_ADMIN_USERNAME,
          },
          password: env.MATRIX_ADMIN_PASSWORD,
        }),
        signal: controller.signal,
      },
    );

    if (response.status === 429) {
      const rateLimitData: { retry_after_ms: string } = await response.json();
      const retryAfterMs = rateLimitData.retry_after_ms;
      const error = `Rate limited on Matrix Login. Retry after ${retryAfterMs}ms`;
      console.error(error);
      throw new Error(error);
    }

    if (!response.ok) {
      const error = `Matrix login failed: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + 60 * 60 * 1000;
    return cachedToken;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix access token request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function getNonce() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const headers = {
    'content-type': 'application/json',
  };

  try {
    const response = await fetch(`${env.MATRIX_ENDPOINT}/v1/register`, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = `Matrix nonce request failed: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }
    const data = await response.json();
    return data.nonce;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix nonce request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function generateHMAC(
  nonce: string,
  username: string,
  password: string,
  admin = false,
) {
  const encoder = new TextEncoder();
  const key = encoder.encode(env.MATRIX_SECRET);

  const nullByte = new Uint8Array([0]);
  const nonceBytes = encoder.encode(nonce);
  const usernameBytes = encoder.encode(username);
  const passwordBytes = encoder.encode(password);
  const adminBytes = encoder.encode(admin ? 'admin' : 'notadmin');

  const message = new Uint8Array([
    ...nonceBytes,
    ...nullByte,
    ...usernameBytes,
    ...nullByte,
    ...passwordBytes,
    ...nullByte,
    ...adminBytes,
  ]);

  const hash = hmac(SHA1, key, message);

  return Array.from(hash)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function matrixRegisterUser(
  username: string,
  firstName: string,
  lastName: string,
  password: string,
  admin = false,
) {
  if (!isMatrixConfigured()) {
    console.log(
      'Matrix account will not be created since the Matrix environment variables are not set.',
    );
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const nonce = await getNonce();
    const hmac = generateHMAC(nonce, username, password);

    const headers = {
      'content-type': 'application/json',
    };

    const body = {
      nonce,
      username,
      displayname: `${firstName} ${lastName}`,
      password,
      admin,
      mac: hmac,
    };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/register`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const error = `Matrix registration failed: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix registration request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixChangePassword(username: string, newPassword: string) {
  if (!isMatrixConfigured()) {
    console.log(
      'Matrix password will not be changed since the Matrix environment variables are not set.',
    );
    return;
  }
  const accessToken = await getMatrixAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    };

    const body = { new_password: `${newPassword}`, logout_devices: true };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/reset_password/${getMatrixUsername(username)}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const error = `Matrix password change failed for ${username}: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix change password request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixChangeDisplayname(
  username: string,
  firstName: string,
  lastName: string,
) {
  if (!isMatrixConfigured()) {
    console.log(
      'Matrix displayname will not be changed since the Matrix environment variables are not set.',
    );
    return;
  }
  const accessToken = await getMatrixAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    };

    const body = { displayname: `${firstName} ${lastName}` };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v2/users/${getMatrixUsername(username)}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const error = `Matrix displayname change failed for ${username}: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix displayname change request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixUploadMedia(buffer: Buffer, contentType: string) {
  if (!isMatrixConfigured()) {
    console.log(
      'Media will not be uploaded to Matrix since the Matrix environment variables are not set.',
    );
    return;
  }
  const accessToken = await getMatrixAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = {
      authorization: `Bearer ${accessToken}`,
      'content-type': contentType,
    };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_matrix/media/v3/upload`,
      {
        method: 'POST',
        headers,
        body: buffer,
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const error = `Matrix media upload failed: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }

    const data: {
      content_uri: string;
    } = await response.json();

    return getMatrixMediaId(data.content_uri);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix upload media request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixDeleteMedia(matrixMediaId: string) {
  if (!isMatrixConfigured()) {
    console.log(
      'Media will not be deleted from Matrix since the Matrix environment variables are not set.',
    );
    return;
  }
  const accessToken = await getMatrixAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const headers = {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/media/${env.MATRIX_SERVER_NAME}/${matrixMediaId}`,
      {
        method: 'DELETE',
        headers,
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const error = `Matrix media deletion failed: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }

    const data = await response.json();
    return data.deleted_media;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix delete media request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixChangeAvatar(username: string, matrixMediaId: string) {
  if (!isMatrixConfigured()) {
    console.log(
      'Matrix avatar will not be changed since the Matrix environment variables are not set.',
    );
    return;
  }
  const accessToken = await getMatrixAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    };

    const body = { avatar_url: getMxcUrl(matrixMediaId) };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v2/users/${getMatrixUsername(username)}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );
    if (!response.ok) {
      const error = `Matrix avatar change failed for ${username}: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix change avatar request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixChangeEmailAndPhonenumber(
  username: string,
  email: string,
  phoneNumber: string,
) {
  if (!isMatrixConfigured()) {
    console.log(
      'Matrix email and phone number will not be changed since the Matrix environment variables are not set.',
    );
    return;
  }
  const accessToken = await getMatrixAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    };

    const body = {
      threepids: [
        { medium: 'email', address: `${email}` },
        { medium: 'msisdn', address: `${phoneNumber}` },
      ],
    };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v2/users/${getMatrixUsername(username)}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const error = `Matrix email and phone number change failed for ${username}: ${response.status} ${response.statusText}`;
      console.error(error);
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix change email and phone number request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixEraseUser(username: string) {
  if (!isMatrixConfigured()) {
    console.log(
      'Matrix user will not be erased since the Matrix environment variables are not set.',
    );
    return;
  }
  const accessToken = await getMatrixAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    };

    const body = { erase: true };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/deactivate/${getMatrixUsername(username)}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Matrix erase user request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export {
  matrixRegisterUser,
  matrixChangePassword,
  matrixChangeDisplayname,
  matrixUploadMedia,
  matrixDeleteMedia,
  matrixChangeAvatar,
  matrixChangeEmailAndPhonenumber,
  matrixEraseUser,
};
