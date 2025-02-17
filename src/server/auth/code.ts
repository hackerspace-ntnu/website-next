import { encodeBase32UpperCaseNoPadding } from '@oslojs/encoding';

function generateRandomOTP() {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  const code = encodeBase32UpperCaseNoPadding(bytes);
  return code;
}

export { generateRandomOTP };
