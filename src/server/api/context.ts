import { routing } from '@/lib/locale';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { s3 } from '@/server/s3';
import type { NestedKeyOf } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// HACK: This is a workaround for the type of `getTranslations` not being exported
type Translations = Awaited<ReturnType<typeof getTranslations>> &
  ((keys: NestedKeyOf<Messages>) => string);

type TRPCContext = {
  locale: (typeof routing.locales)[number];
  db: typeof db;
  auth: typeof auth;
  s3: typeof s3;
  getTranslations: Translations;
};

async function createContext(
  locale: (typeof routing.locales)[number],
): Promise<TRPCContext> {
  const t = (await getTranslations({
    locale: locale ?? routing.defaultLocale,
  })) as Translations;
  return {
    locale,
    auth,
    db,
    s3,
    getTranslations: t,
  };
}

export { createContext, type TRPCContext };
