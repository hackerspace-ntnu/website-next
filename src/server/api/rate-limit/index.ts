import { headers } from 'next/headers';

import { RefillingTokenBucket } from '@/server/api/rate-limit/refillingTokenBucket';

const globalBucket = new RefillingTokenBucket<string>(500, 1);

async function getClientIP() {
  const headerStore = await headers();
  return headerStore.get('X-Forwarded-For');
}

async function globalGETRateLimit() {
  const clientIP = await getClientIP();
  if (clientIP === null) {
    return true;
  }
  return globalBucket.consume(clientIP, 1);
}

async function globalPOSTRateLimit() {
  const clientIP = await getClientIP();
  if (clientIP === null) {
    return true;
  }
  return globalBucket.consume(clientIP, 3);
}

export { globalGETRateLimit, globalPOSTRateLimit };
