import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { locales, localePrefix, pathnames } from "@/lib/config";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
