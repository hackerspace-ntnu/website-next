import type { routing } from '@/lib/locale';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { s3 } from '@/server/s3';

type TRPCContext = {
  locale: (typeof routing.locales)[number];
  db: typeof db;
  auth: typeof auth;
  s3: typeof s3;
};

function createContext(locale: (typeof routing.locales)[number]): TRPCContext {
  return {
    locale,
    auth,
    db,
    s3,
  };
}

export { createContext, type TRPCContext };
