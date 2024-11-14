import { TRPCError } from '@trpc/server';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import { routing } from '@/lib/locale';

async function getLocaleFromCookie() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value ?? routing.defaultLocale;
  if (!routing.locales.includes(locale as 'en')) {
    const t = await getTranslations('error');
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: t('invalidLocale', { locale }),
    });
  }
  return locale;
}

export { getLocaleFromCookie };
