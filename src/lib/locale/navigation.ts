import { routing } from '@/lib/locale';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation(routing);
