'use client';

import NextError from 'next/error';
import { routing } from '@/lib/locale';

export default function NotFoundPage() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
