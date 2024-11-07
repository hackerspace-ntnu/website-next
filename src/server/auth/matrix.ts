import * as crypto from 'crypto';
import { env } from '@/env';

// Get unique nonce
async function getNonce(): Promise<string | undefined> {
  const getRequest: RequestInfo = new Request(
    'https://matrix.hackerspace-ntnu.no/_synapse/admin/v1/register',
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

// Generate MAC
function generateMAC(
  nonce: string | undefined,
  username: string,
  password: string,
  admin = false,
): string {
  const encoder = new TextEncoder();
  const nullByte = new Uint8Array([0]);
  const key = encoder.encode(env.REGISTRATION_SHARED_SECRET_MATRIX);

  const hmac = crypto.createHmac('sha1', key);
  hmac.update(encoder.encode(nonce));
  hmac.update(nullByte);
  hmac.update(encoder.encode(username));
  hmac.update(nullByte);
  hmac.update(encoder.encode(password));
  hmac.update(nullByte);
  if (!admin) {
    hmac.update(encoder.encode('notadmin'));
  } else {
    hmac.update(encoder.encode('admin'));
  }

  return hmac.digest('hex');
}

// Register user on Matrix
async function registerUser(
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

  const response = await fetch(
    'https://matrix.hackerspace-ntnu.no/_synapse/admin/v1/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );

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
