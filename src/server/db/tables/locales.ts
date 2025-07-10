import { pgEnum } from 'drizzle-orm/pg-core';

import { routing } from '@/lib/locale';

const localesEnum = pgEnum('locale', routing.locales);

export { localesEnum };
