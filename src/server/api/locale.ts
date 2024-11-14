import { routing } from '@/lib/locale';

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

export { getLocaleFromRequest };
