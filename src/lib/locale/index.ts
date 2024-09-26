import { GB, NO } from 'country-flag-icons/react/1x1';
import { defineRouting } from 'next-intl/routing';

export const localeIcons = { en: GB, no: NO };

export const routing = defineRouting({
  locales: ['en', 'no'],
  defaultLocale: 'no',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/login': {
      en: '/login',
      no: '/logg-inn',
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
  },
});
