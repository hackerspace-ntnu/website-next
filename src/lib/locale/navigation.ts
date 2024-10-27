import { routing } from '@/lib/locale';
import { createNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
