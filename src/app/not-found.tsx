'use client';

import NextError from 'next/error';

export default function NotFoundPage() {
  return (
    <html lang='en'>
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
