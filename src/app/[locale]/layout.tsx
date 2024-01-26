import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Inter, Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

import { locales } from '@/lib/config';
import { cx } from '@/lib/utils';

import { RootProviders } from '@/components/providers/RootProviders';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: {
      template: '%s | Hackerspace NTNU',
      default: 'Hackerspace NTNU',
    },
    description: t('description'),
    icons: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/favicon/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png',
      },
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
    meta: [
      { name: 'msapplication-TileColor', content: '#0c0a09' },
      { name: 'theme-color', content: '#0c0a09' },
    ],
  };
}

export default function Localelayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale)) notFound();
  unstable_setRequestLocale(locale);
  return (
    <html
      className={cx('h-full w-full', inter.variable, montserrat.variable)}
      lang={locale}
      dir='ltr'
      suppressHydrationWarning
    >
      <body className='h-full w-full bg-background font-inter text-foreground antialiased'>
        <RootProviders params={{ locale: locale }}>
          <div className='fixed bottom-0 top-0 flex h-full w-full flex-col overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-background scrollbar-thumb-primary/40 scrollbar-corner-background scrollbar-thumb-rounded-lg hover:scrollbar-thumb-primary/80'>
            {children}
          </div>
        </RootProviders>
      </body>
    </html>
  );
}
