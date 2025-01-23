import { routing } from '@/lib/locale';
import {
  type Formats,
  type NestedKeyOf,
  type TranslationValues,
  useTranslations,
} from 'next-intl';

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

function useStringifyTranslations() {
  return (
    key: NestedKeyOf<Messages>,
    values?: TranslationValues,
    formats?: Formats,
  ) => JSON.stringify({ key, values, formats });
}

function useValidationTranslations() {
  return typeof window !== 'undefined'
    ? useTranslations()
    : useStringifyTranslations();
}

export { getLocaleFromRequest, useValidationTranslations };
