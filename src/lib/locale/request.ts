import { routing } from '@/lib/locale';
import { type Formats, hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export const formats = {
  dateTime: {},
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    formats,
    messages: (await import(`../../../messages/${locale}.json`)).default,
  };
});
