import { AsyncLocalStorage } from 'node:async_hooks';
import { routing } from '@/lib/locale';
import type { Translations } from '@/lib/locale';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { s3 } from '@/server/s3';
import { getTranslations } from 'next-intl/server';

type TRPCContext = {
  locale: (typeof routing.locales)[number];
  db: typeof db;
  auth: typeof auth;
  s3: typeof s3;
  t: Translations;
};

async function createContext(
  locale: (typeof routing.locales)[number],
): Promise<TRPCContext> {
  const t = await getTranslations({
    locale: locale ?? routing.defaultLocale,
  });
  return {
    locale,
    auth,
    db,
    s3,
    t,
  };
}

const contextStorage = new AsyncLocalStorage<TRPCContext>();

function getContext() {
  const ctx = contextStorage.getStore();
  if (!ctx) {
    throw new Error('No TRPC context found');
  }
  return ctx;
}

export { createContext, contextStorage, getContext, type TRPCContext };
