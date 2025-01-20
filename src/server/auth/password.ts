import { hash, verify } from '@node-rs/argon2';
import { sha1 } from '@oslojs/crypto/sha1';
import { encodeHexLowerCase } from '@oslojs/encoding';

async function hashPassword(password: string) {
  if (typeof Bun !== 'undefined' && Bun.password) {
    return await Bun.password.hash(password, {
      algorithm: 'argon2id',
      memoryCost: 19456,
      timeCost: 2,
    });
  }
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}

async function verifyPasswordHash(
  hash: string,
  password: string,
): Promise<boolean> {
  if (typeof Bun !== 'undefined' && Bun.password) {
    return await Bun.password.verify(password, hash);
  }
  return await verify(hash, password);
}

async function verifyPasswordStrength(password: string) {
  const hash = encodeHexLowerCase(sha1(new TextEncoder().encode(password)));
  const hashPrefix = hash.slice(0, 5);
  try {
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${hashPrefix}`,
    );
    const data = await response.text();
    const items = data.split('\n');
    for (const item of items) {
      const hashSuffix = item.slice(0, 35).toLowerCase();
      if (hash === hashPrefix + hashSuffix) {
        return false;
      }
    }
  } catch (error) {
    console.error('Error fetching pwned passwords:', error);
    return false;
  }
  return true;
}

export { hashPassword, verifyPasswordHash, verifyPasswordStrength };
