import { env } from '@/env';
import { hmac } from '@oslojs/crypto/hmac';
import { SHA1 } from '@oslojs/crypto/sha1';

async function getNonce(): Promise<string | undefined> {
  const getRequest: RequestInfo = new Request(
    `${env.MATRIX_ENDPOINT}/v1/register`,
    { method: 'GET' },
  );

  try {
    const response = await fetch(getRequest);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.nonce;
  } catch (error) {
    console.error('Failed to fetch nonce: ', error);
  }
}

function generateMAC(
  nonce: string | undefined,
  username: string,
  password: string,
  admin = false,
): string {
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
): Promise<boolean> {
  const nonce = await getNonce();
  const hmac = generateMAC(nonce, username, password);

  const data = {
    nonce: nonce,
    username: username,
    displayname: displayname,
    password: password,
    admin: admin,
    mac: hmac,
  };

  const response = await fetch(`${env.MATRIX_ENDPOINT}/v1/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    console.log('Managed to send POST request:', jsonResponse);
    return true;
  }
  let errorDetails = '';
  try {
    const errorResponse = await response.json();
    errorDetails = JSON.stringify(errorResponse, null, 2);
  } catch {
    errorDetails = 'Unable to parse error response';
  }
  console.error(
    `Failed to create user!\nStatus: ${response.status} ${response.statusText}\nDetails: ${errorDetails}`,
  );
  return false;
}

export { registerMatrixUser };
