import { routing } from '@/lib/locale';
import { getContext } from '@/server/api/context';
import type { DBLocale } from '@/server/db/tables';

function getLocaleFromRequest(request: Request) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    return 'en-GB';
  }
  const preferredLocale =
    acceptLanguage.split(',').at(0)?.split(';').at(0)?.trim() ?? '';

  return routing.locales
    .filter((l) => l !== 'ko-KP')
    .includes(preferredLocale as DBLocale)
    ? (preferredLocale as DBLocale)
    : 'en-GB';
}

function useTranslationsFromContext() {
  const ctx = getContext();
  return ctx.t;
}

export { getLocaleFromRequest, useTranslationsFromContext };
