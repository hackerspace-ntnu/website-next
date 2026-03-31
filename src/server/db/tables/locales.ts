import { pgEnum } from 'drizzle-orm/pg-core';
import { routing } from '@/lib/locale';

type DBLocale = Exclude<(typeof routing.locales)[number], 'ko-KP'>;
const dbLocales = routing.locales.filter(
  (l): l is DBLocale => l !== 'ko-KP',
) as [DBLocale, ...DBLocale[]];

const localesEnum = pgEnum('locale', dbLocales);

export { type DBLocale, dbLocales, localesEnum };
