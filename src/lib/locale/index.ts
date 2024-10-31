import { GB, NO } from 'country-flag-icons/react/1x1';
import { defineRouting } from 'next-intl/routing';
import {
  enGB as enDayPicker,
  nb as noDayPicker,
} from 'react-day-picker/locale';

const localeIcons = { en: GB, no: NO };

const dayPickerLocales = { en: enDayPicker, no: noDayPicker };

const routing = defineRouting({
  locales: ['en', 'no'],
  defaultLocale: 'no',
  localePrefix: 'as-needed',
  localeCookie: {
    name: 'locale',
  },
  pathnames: {
    '/': '/',
    '/auth/sign-in': {
      en: '/auth/sign-in',
      no: '/autentisering/logg-inn',
    },
    '/auth/create-account': {
      en: '/auth/create-account',
      no: '/autentisering/opprett-konto',
    },
    '/auth/forgot-password': {
      en: '/auth/forgot-password',
      no: '/autentisering/glemt-passord',
    },
    '/events': {
      en: '/events',
      no: '/arrangementer',
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
  },
});

export { localeIcons, dayPickerLocales, routing };
