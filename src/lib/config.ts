import GBflagIcon from 'country-flag-icons/react/1x1/GB';
import NOflagIcon from 'country-flag-icons/react/1x1/NO';
import type { Pathnames } from 'next-intl/navigation';

const flagIcons = { en: GBflagIcon, no: NOflagIcon };

const locales = ['en', 'no'];
const defaultLocale = 'no';
const localePrefix = 'as-needed';

const pathnames = {
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
} satisfies Pathnames<typeof locales>;

export { flagIcons, locales, defaultLocale, localePrefix, pathnames };
