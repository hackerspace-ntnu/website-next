'use client';

import { redirect, usePathname } from 'next/navigation';

import { defaultLocale } from '@/lib/config';

export default function NotFound() {
  const pathname = usePathname();
  redirect(`/${defaultLocale}${pathname}`);
}
