import GBflagIcon from 'country-flag-icons/react/1x1/GB';
import NOflagIcon from 'country-flag-icons/react/1x1/NO';
import { type Pathnames } from 'next-intl/navigation';

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
  '/news/[articleId]': {
    en: '/news/[articleId]',
    no: '/nyheter/[articleId]',
  },
  '/about': {
    en: '/about',
    no: '/om-oss',
  },
} satisfies Pathnames<typeof locales>;

export { flagIcons, locales, defaultLocale, localePrefix, pathnames };
