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
      en: '/about/leaderboard',
      no: '/om-oss/ledelsen',
    },
    '/about/member-representative': {
      en: '/about/member-representative',
      no: '/om-oss/tillitsvalgt',
    },
    '/about/devops': {
      en: '/about/devops',
      no: '/om-oss/devops',
    },
    '/about/labops': {
      en: '/about/labops',
      no: '/om-oss/labops',
    },
    '/about/breadboard-computer': {
      en: '/about/breadboard-computer-group',
      no: '/om-oss/breadboard-computer-gruppe',
    },
    '/about/game': {
      en: '/about/game-group',
      no: '/om-oss/spill-gruppe',
    },
    '/about/ttrpg': {
      en: '/about/ttrpg-group',
      no: '/om-oss/ttrpg-gruppe',
    },
    '/storage': {
      en: '/storage',
      no: '/lager',
    },
    '/storage/shopping-cart': {
      en: '/storage/shopping-cart',
      no: '/lager/handlekurv',
    },
    '/shift-schedule': {
      en: '/shift-schedule',
      no: '/vaktliste',
    },
  },
});

export { localeIcons, dayPickerLocales, routing };
