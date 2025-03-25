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

const localeIcons = { en: GB, no: NO };

const dayPickerLocales = { en: enDayPicker, no: noDayPicker };

const phoneNumberInputLocales = {
  en: enPhoneNumberInput,
  no: noPhoneNumberInput,
};

const routing = defineRouting({
  locales: ['en', 'no'],
  defaultLocale: 'no',
  localePrefix: 'as-needed',
  localeCookie: {
    name: 'locale',
  },
  pathnames: {
    '/': '/',
    '/too-many-requests': {
      en: '/too-many-requests',
      no: '/for-mange-forespørsler',
    },
    '/auth': {
      en: '/auth',
      no: '/autentisering',
    },
    '/auth/account': {
      en: '/auth/account',
      no: '/autentisering/konto',
    },
    '/auth/create-account': {
      en: '/auth/create-account',
      no: '/autentisering/opprett-konto',
    },
    '/auth/forgot-password': {
      en: '/auth/forgot-password',
      no: '/autentisering/glemt-passord',
    },
    '/auth/verify-email': {
      en: '/auth/verify-email',
      no: '/autentisering/bekreft-epost',
    },
    '/auth/success': {
      en: '/auth/success',
      no: '/autentisering/suksess',
    },
    '/settings': {
      en: '/settings',
      no: '/instillinger',
    },
    '/settings/account': {
      en: '/settings/account',
      no: '/innstillinger/konto',
    },
    '/settings/notifications': {
      en: '/settings/notifications',
      no: '/innstillinger/notifikasjoner',
    },
    '/settings/administrator': {
      en: '/settings/administrator',
      no: '/innstillinger/administrator',
    },
    '/events': {
      en: '/events',
      no: '/arrangementer',
    },
    '/events/[id]': {
      en: '/events/[id]',
      no: '/arrangementer/[id]',
    },
    '/news': {
      en: '/news',
      no: '/nyheter',
    },
    '/news/new': {
      en: '/news/new',
      no: '/nyheter/ny',
    },
    '/news/[article]': {
      en: '/news/[article]',
      no: '/nyheter/[article]',
    },
    '/about': {
      en: '/about',
      no: '/om-oss',
    },
    '/storage': {
      en: '/storage',
      no: '/lager',
    },
    '/storage/shopping-cart': {
      en: '/storage/shopping-cart',
      no: '/lager/handlekurv',
    },
    '/storage/item/new': {
      en: '/storage/item/new',
      no: '/lager/gjenstand/ny',
    },
    '/storage/item/[id]': {
      en: '/storage/item/[id]',
      no: '/lager/gjenstand/[id]',
    },
    '/storage/item/[id]/edit': {
      en: '/storage/item/[id]/edit',
      no: '/lager/gjenstand/[id]/rediger',
    },
    '/storage/loans': {
      en: '/storage/loans',
      no: '/lager/lån',
    },
    '/rules': {
      en: '/rules',
      no: '/regler',
    },
    '/rules/[subset]': {
      en: '/rules/[subset]',
      no: '/regler/[subset]',
    },
    '/shift-schedule': {
      en: '/shift-schedule',
      no: '/vaktliste',
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
