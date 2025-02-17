import { env } from '@/env';
import { hmac } from '@oslojs/crypto/hmac';
import { SHA1 } from '@oslojs/crypto/sha1';

const headers = {
  'content-type': 'application/json',
};

const authorizedHeaders = {
  authorization: `bearer ${env.MATRIX_ACCESS_TOKEN}`,
  ...headers,
};

function isMatrixConfigured() {
  return (
    env.MATRIX_SERVER_NAME &&
    env.MATRIX_ENDPOINT &&
    env.MATRIX_SECRET &&
    env.MATRIX_ACCESS_TOKEN &&
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

async function getNonce() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${env.MATRIX_ENDPOINT}/v1/register`, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Matrix nonce request failed: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.nonce;
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
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const nonce = await getNonce();
    const hmac = generateHMAC(nonce, username, password);

    const data = {
      nonce,
      username,
      displayname: `${firstName} + ${lastName}`,
      password,
      admin,
      mac: hmac,
    };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/register`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Matrix registration failed: ${response.status} ${response.statusText}`,
      );
    }
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const data = { new_password: `${newPassword}`, logout_devices: true };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/reset_password/${getMatrixUsername(username)}`,
      {
        method: 'POST',
        headers: authorizedHeaders,
        body: JSON.stringify(data),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Matrix password change failed for ${username}: ${response.status} ${response.statusText}`,
      );
    }
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const body = { displayname: `${firstName} + ${lastName}` };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v2/users/${getMatrixUsername(username)}`,
      {
        method: 'PUT',
        headers: authorizedHeaders,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Matrix displayname change failed for ${username}: ${response.status} ${response.statusText}`,
      );
    }
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const headers = {
      authorization: `bearer ${env.MATRIX_ACCESS_TOKEN}`,
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
      throw new Error(
        `Matrix media upload failed: ${response.status} ${response.statusText}`,
      );
    }

    const data: {
      content_uri: string;
    } = await response.json();

    return getMatrixMediaId(data.content_uri);
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const body = { avatar_url: getMxcUrl(matrixMediaId) };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/v2/users/@${username}:${env.MATRIX_SERVER_NAME}`,
      {
        method: 'PUT',
        headers: authorizedHeaders,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Matrix avatar change failed for ${username}: ${response.status} ${response.statusText}`,
      );
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function matrixChangeEmailAndPhonenumber(
  username: string,
  email: string,
  phonenumber: string,
) {
  if (!isMatrixConfigured()) {
    console.log(
      'Matrix email and phonenumber will not be changed since the Matrix environment variables are not set.',
    );
    return;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const data = {
      threepids: [
        { medium: 'email', address: `${email}` },
        { medium: 'msisdn', address: `${phonenumber}` },
      ],
    };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v2/users/${getMatrixUsername(username)}`,
      {
        method: 'PUT',
        headers: authorizedHeaders,
        body: JSON.stringify(data),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Matrix email and phonenumber change failed for ${username}: ${response.status} ${response.statusText}`,
      );
    }
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const body = { erase: true };

    const response = await fetch(
      `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/deactivate/${getMatrixUsername(username)}`,
      {
        method: 'POST',
        headers: authorizedHeaders,
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export {
  matrixRegisterUser,
  matrixChangePassword,
  matrixChangeDisplayname,
  matrixUploadMedia,
  matrixChangeAvatar,
  matrixChangeEmailAndPhonenumber,
  matrixEraseUser,
};
