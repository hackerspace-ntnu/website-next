import { routing } from '@/lib/locale';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as 'en')) notFound();
  return {
    messages: (await import(`../../../messages/${locale}.json`))
      .default as Messages,
  };
});
