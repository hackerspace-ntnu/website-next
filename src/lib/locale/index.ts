import { GB, NO } from 'country-flag-icons/react/1x1';
import { defineRouting } from 'next-intl/routing';

export const localeIcons = { en: GB, no: NO };

export const routing = defineRouting({
  locales: ['en', 'no'],
  defaultLocale: 'no',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
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
    '/about/leaderboard': {
      en: '/leaderboard',
      no: '/ledelsen',
    },
    '/about/devops': {
      en: '/devops',
      no: '/devops',
    },
    '/about/member-representative': {
      en: '/member-representative',
      no: '/tillitsvalgt',
    },
    '/about/labops': {
      en: '/labops',
      no: '/labops',
    },
    '/about/breadboard-computer': {
      en: '/breadboard-computer',
      no: '/breadboard-computer',
    },
    '/about/game': {
      en: '/game',
      no: '/spill',
    },
    '/about/ttrpg': {
      en: '/ttrpg',
      no: '/ttrpg',
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
