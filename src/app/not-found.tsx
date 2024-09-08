'use client';

import { routing } from '@/lib/locale';
import { redirect, usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  redirect(`/${routing.defaultLocale}/${pathname}`);
}
