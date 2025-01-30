import { routing } from '@/lib/locale';
import { getContext } from '@/server/api/context';

function getLocaleFromRequest(request: Request) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    return routing.defaultLocale;
  }
  const preferredLocale =
    acceptLanguage.split(',').at(0)?.split(';').at(0)?.toLowerCase().trim() ??
    '';

  return routing.locales.includes(
    preferredLocale as (typeof routing.locales)[number],
  )
    ? (preferredLocale as (typeof routing.locales)[number])
    : routing.defaultLocale;
}

function useTranslationsFromContext() {
  const ctx = getContext();
  return ctx.t;
}

export { getLocaleFromRequest, useTranslationsFromContext };
