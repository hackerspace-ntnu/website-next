import { env } from '@/env';
import { hmac } from '@oslojs/crypto/hmac';
import { SHA1 } from '@oslojs/crypto/sha1';

async function getNonce() {
  const getRequest: RequestInfo = new Request(
    `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/register`,
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

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/register`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    },
  );

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
    `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/reset_password/@${username}:${env.MATRIX_SERVER_NAME}`,
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
  firstName: string,
  lastName: string,
) {
  const displayName = `${firstName} + ${lastName}`;

  const headers = {
    Authorization: `Bearer ${env.MATRIX_ACCESS_TOKEN}`,
    'content-type': 'application/json',
  };

  const body = { displayname: `${displayName}` };

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/_synapse/admin/v2/users/@${username}:${env.MATRIX_SERVER_NAME}`,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body),
    },
  );

  return response;
}

async function matrixUploadMedia(buffer: Buffer, filetype: string) {
  const headers = {
    Authorization: `Bearer ${env.MATRIX_ACCESS_TOKEN}`,
    'Content-Type': 'contentType',
  };

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/_matrix/media/v3/upload`,
    {
      method: 'POST',
      headers: headers,
      body: buffer,
    },
  );

  return response.json();
}

async function matrixChangeAvatar(username: string, mxcURL: string) {
  const headers = {
    Authorization: `Bearer ${env.MATRIX_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const data = JSON.stringify({ avatar_url: mxcURL });
  console.log(data);

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/v2/users/@${username}:${env.MATRIX_SERVER_NAME}`,
    {
      method: 'PUT',
      headers: headers,
      body: data,
    },
  );

  return response;
}

async function matrixChangeEmailPhonenumber(
  username: string,
  email: string,
  phonenumber: string,
) {
  const headers = {
    Authorization: `Bearer ${env.MATRIX_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const data = {
    threepids: [
      { medium: 'email', address: `${email}` },
      { medium: 'msisdn', address: `${phonenumber}` },
    ],
  };

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/_synapse/admin/v2/users/@${username}:${env.MATRIX_SERVER_NAME}`,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data),
    },
  );
  return response;
}

async function matrixEraseUser(username: string) {
  const headers = {
    Authorization: `Bearer ${env.MATRIX_ACCESS_TOKEN}`,
  };

  const data = { erase: true };

  const response = await fetch(
    `${env.MATRIX_ENDPOINT}/_synapse/admin/v1/deactivate/@${username}:${env.MATRIX_SERVER_NAME}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    },
  );

  return response;
}

export { matrixEraseUser };
export { matrixChangeEmailPhonenumber };
export { matrixChangeAvatar };
export { matrixUploadMedia };
export { matrixChangeDisplayname };
export { matrixChangePassword };
export { registerMatrixUser };
