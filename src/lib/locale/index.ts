import { GB, NO } from 'country-flag-icons/react/1x1';
import type { useTranslations } from 'next-intl';
import { defineRouting } from 'next-intl/routing';
import type { getTranslations } from 'next-intl/server';
import {
  enGB as enDayPicker,
  nb as noDayPicker,
} from 'react-day-picker/locale';
import enPhoneNumberInput from 'react-phone-number-input/locale/en';
import noPhoneNumberInput from 'react-phone-number-input/locale/nb';

type Translations =
  | ReturnType<typeof useTranslations<never>>
  | Awaited<ReturnType<typeof getTranslations<never>>>;

const localeIcons = { 'en-GB': GB, 'nb-NO': NO };

const dayPickerLocales = { 'en-GB': enDayPicker, 'nb-NO': noDayPicker };

const phoneNumberInputLocales = {
  'en-GB': enPhoneNumberInput,
  'nb-NO': noPhoneNumberInput,
};

const routing = defineRouting({
  locales: ['en-GB', 'nb-NO'],
  defaultLocale: 'nb-NO',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en-GB': '/en',
      'nb-NO': '/no',
    },
  },
  localeCookie: {
    name: 'locale',
  },
  pathnames: {
    '/': '/',
    '/too-many-requests': {
      'en-GB': '/too-many-requests',
      'nb-NO': '/for-mange-forespørsler',
    },
    '/about': {
      'en-GB': '/about',
      'nb-NO': '/om-oss',
    },
    '/about/group/new': {
      'en-GB': '/about/group/new',
      'nb-NO': '/om-oss/gruppe/ny',
    },
    '/about/group/[name]': {
      'en-GB': '/about/group/[name]',
      'nb-NO': '/om-oss/gruppe/[name]',
    },
    '/about/group/[name]/edit': {
      'en-GB': '/about/group/[name]/edit',
      'nb-NO': '/om-oss/gruppe/[name]/rediger',
    },
    '/auth': {
      'en-GB': '/auth',
      'nb-NO': '/autentisering',
    },
    '/auth/account': {
      'en-GB': '/auth/account',
      'nb-NO': '/autentisering/konto',
    },
    '/auth/create-account': {
      'en-GB': '/auth/create-account',
      'nb-NO': '/autentisering/opprett-konto',
    },
    '/auth/forgot-password': {
      'en-GB': '/auth/forgot-password',
      'nb-NO': '/autentisering/glemt-passord',
    },
    '/auth/verify-email': {
      'en-GB': '/auth/verify-email',
      'nb-NO': '/autentisering/bekreft-epost',
    },
    '/auth/success': {
      'en-GB': '/auth/success',
      'nb-NO': '/autentisering/suksess',
    },
    '/settings': {
      'en-GB': '/settings',
      'nb-NO': '/innstillinger',
    },
    '/settings/account': {
      'en-GB': '/settings/account',
      'nb-NO': '/innstillinger/konto',
    },
    '/settings/notifications': {
      'en-GB': '/settings/notifications',
      'nb-NO': '/innstillinger/notifikasjoner',
    },
    '/events': {
      'en-GB': '/events',
      'nb-NO': '/arrangementer',
    },
    '/events/new': {
      'en-GB': '/events/new',
      'nb-NO': '/arrangementer/ny',
    },
    '/events/[eventId]': {
      'en-GB': '/events/[eventId]',
      'nb-NO': '/arrangementer/[eventId]',
    },
    '/events/[eventId]/edit': {
      'en-GB': '/events/[eventId]/edit',
      'nb-NO': '/arrangementer/[eventId]/rediger',
    },
    '/news': {
      'en-GB': '/news',
      'nb-NO': '/nyheter',
    },
    '/news/new': {
      'en-GB': '/news/new',
      'nb-NO': '/nyheter/ny',
    },
    '/news/[articleId]': {
      'en-GB': '/news/[articleId]',
      'nb-NO': '/nyheter/[articleId]',
    },
    '/news/[articleId]/edit': {
      'en-GB': '/news/[articleId]/edit',
      'nb-NO': '/nyheter/[articleId]/rediger',
    },
    '/members': {
      'en-GB': '/members',
      'nb-NO': '/medlemmer',
    },
    '/members/[memberId]': {
      'en-GB': '/members/[memberId]',
      'nb-NO': '/medlemmer/[memberId]',
    },
    '/storage': {
      'en-GB': '/storage',
      'nb-NO': '/lager',
    },
    '/storage/shopping-cart': {
      'en-GB': '/storage/shopping-cart',
      'nb-NO': '/lager/handlekurv',
    },
    '/storage/item/new': {
      'en-GB': '/storage/item/new',
      'nb-NO': '/lager/gjenstand/ny',
    },
    '/storage/item/[itemId]': {
      'en-GB': '/storage/item/[itemId]',
      'nb-NO': '/lager/gjenstand/[itemId]',
    },
    '/storage/item/[itemId]/edit': {
      'en-GB': '/storage/item/[itemId]/edit',
      'nb-NO': '/lager/gjenstand/[itemId]/rediger',
    },
    '/storage/loans': {
      'en-GB': '/storage/loans',
      'nb-NO': '/lager/lån',
    },
    '/storage/loans/user': {
      'en-GB': '/storage/loans/user',
      'nb-NO': '/lager/lån/bruker',
    },
    '/storage/categories': {
      'en-GB': '/storage/categories',
      'nb-NO': '/lager/kategorier',
    },
    '/rules': {
      'en-GB': '/rules',
      'nb-NO': '/regler',
    },
    '/rules/[subsetId]': {
      'en-GB': '/rules/[subsetId]',
      'nb-NO': '/regler/[subsetId]',
    },
    '/rules/new': {
      'en-GB': '/rules/new',
      'nb-NO': '/regler/ny',
    },
    '/rules/[subsetId]/edit': {
      'en-GB': '/rules/[subsetId]/edit',
      'nb-NO': '/regler/[subsetId]/rediger',
    },
    '/shift-schedule': {
      'en-GB': '/shift-schedule',
      'nb-NO': '/vaktliste',
    },
    '/applications/apply': {
      'en-GB': '/applications/apply',
      'nb-NO': '/opptak/søk',
    },
    '/applications/thank-you': {
      'en-GB': '/applications/thank-you',
      'nb-NO': '/opptak/takk',
    },
    '/applications/view': {
      'en-GB': '/applications/view',
      'nb-NO': '/opptak/vis',
    },
    '/applications/view/[appId]': {
      'en-GB': '/applications/view/[appId]',
      'nb-NO': '/opptak/vis/[appId]',
    },
    '/quotes': {
      'en-GB': '/quotes',
      'nb-NO': '/sitater',
    },
    '/quotes/new': {
      'en-GB': '/quotes/new',
      'nb-NO': '/sitater/ny',
    },
    '/quotes/[quoteId]/edit': {
      'en-GB': '/quotes/[quoteId]/edit',
      'nb-NO': '/sitater/[quoteId]/rediger',
    },
    '/privacy-policy': {
      'en-GB': '/privacy-policy',
      'nb-NO': '/personvern',
    },
    '/management': {
      'en-GB': '/management',
      'nb-NO': '/administrasjon',
    },
    '/management/skills': {
      'en-GB': '/management/skills',
      'nb-NO': '/administrasjon/ferdigheter',
    },
    '/management/skills/[skillIdentifier]': {
      'en-GB': '/management/skills/[skillIdentifier]',
      'nb-NO': '/administrasjon/ferdigheter/[skillIdentifier]',
    },
    '/management/skills/new': {
      'en-GB': '/management/skills/new',
      'nb-NO': '/administrasjon/ferdigheter/ny',
    },
    '/reservations': {
      'en-GB': '/reservations',
      'nb-NO': '/reservasjoner',
    },
    '/reservations/[toolId]': {
      'en-GB': '/reservations/[toolId]',
      'nb-NO': '/reservasjoner/[toolId]',
    },
    '/reservations/tools/new': {
      'en-GB': '/reservations/tools/new',
      'nb-NO': '/reservasjoner/verktøy/ny',
    },
    '/reservations/tools/[toolId]/edit': {
      'en-GB': '/reservations/tools/[toolId]/edit',
      'nb-NO': '/reservasjoner/verktøy/[toolId]/rediger',
    },
  },
});

export {
  localeIcons,
  dayPickerLocales,
  phoneNumberInputLocales,
  routing,
  type Translations,
};
