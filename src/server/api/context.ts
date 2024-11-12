import { routing } from '@/lib/locale';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { s3 } from '@/server/s3';

type TRPCContext = {
  db: typeof db;
  auth: typeof auth;
  s3: typeof s3;
  locale: (typeof routing.locales)[number];
};

function createContext(locale: string): TRPCContext {
  const validLocale = routing.locales.includes(
    locale as (typeof routing.locales)[number],
  )
    ? (locale as (typeof routing.locales)[number])
    : routing.defaultLocale;

  return {
    auth,
    db,
    s3,
    locale: validLocale,
  };
}

export { createContext, type TRPCContext };
