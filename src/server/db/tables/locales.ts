import { pgEnum } from 'drizzle-orm/pg-core';

import { routing } from '@/lib/locale';

const locales = pgEnum('locale', routing.locales);

export { locales };
