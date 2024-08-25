import GBflagIcon from 'country-flag-icons/react/1x1/GB';
import NOflagIcon from 'country-flag-icons/react/1x1/NO';
import type { Pathnames } from 'next-intl/routing';

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
} satisfies Pathnames<typeof locales>;

export { flagIcons, locales, defaultLocale, localePrefix, pathnames };
