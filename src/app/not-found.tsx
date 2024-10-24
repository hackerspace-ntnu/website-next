'use client';

import { routing } from '@/lib/locale';
import NextError from 'next/error';

export default function NotFoundPage() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
