import createMiddleware from 'next-intl/middleware';

import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from '@/lib/locale/config';

export default createMiddleware({
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
});

export const config = {
  matcher: ['/', '/(en|no)/:path*', '/((?!api|_next|.*\\..*).*)'],
};
