import { env } from '@/env';
import { hmac } from '@oslojs/crypto/hmac';
import { SHA1 } from '@oslojs/crypto/sha1';
import { testRouter } from '../api/routers';

async function getNonce() {
  const getRequest: RequestInfo = new Request(
    `${env.MATRIX_ENDPOINT}/v1/register`,
    { method: 'GET' },
  );

  const response = await fetch(getRequest);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.nonce;
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

async function registerMatrixUser(
  username: string,
  displayname: string,
  password: string,
  admin = false,
) {
  const nonce = await getNonce();
  const hmac = generateHMAC(nonce, username, password);

  const data = {
    nonce,
    username,
    displayname,
    password,
    admin,
    mac: hmac,
  };

  const response = await fetch(`${env.MATRIX_ENDPOINT}/v1/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Matrix registration failed: ${response.status}`);
  }
}

async function matrixChangePassword(username: string, newPassword: string) {
  const headers = {
    Authorization: `Bearer ${env.MATRIX_ACCESS_TOKEN}`,
    'content-type': 'application/json',
  };

  const body = { new_password: `${newPassword}`, logout_devices: true };

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/v1/reset_password/@${username}:hackerspace-ntnu.no`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    },
  );

  return response;
}

async function matrixChangeDisplayname(
  username: string,
  newDisplayname: string,
) {
  const headers = {
    Authorization: `Bearer ${env.MATRIX_ACCESS_TOKEN}`,
    'content-type': 'application/json',
  };

  const body = { displayname: `${newDisplayname}` };

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/v2/users/@${username}:hackerspace-ntnu.no`,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body),
    },
  );

  return response;
}

export { matrixChangeDisplayname };
export { matrixChangePassword };
export { registerMatrixUser };
