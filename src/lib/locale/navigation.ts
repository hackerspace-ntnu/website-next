import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import { localePrefix, locales, pathnames } from '@/lib/locale/config';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
