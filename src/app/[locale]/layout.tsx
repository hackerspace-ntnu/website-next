import { RootProviders } from '@/components/providers/RootProviders';
import { routing } from '@/lib/locale';
import { cx } from '@/lib/utils';
import type { Viewport } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Inter, Montserrat } from 'next/font/google';

type LocaleLayoutProps = {
  children: React.ReactNode;
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
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0c0a09',
};

export async function generateMetadata({
  params: { locale },
}: Omit<LocaleLayoutProps, 'children'>) {
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
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  unstable_setRequestLocale(locale);
  return (
    <html
      className={cx('size-full', inter.variable, montserrat.variable)}
      lang={locale}
      dir='ltr'
      suppressHydrationWarning
    >
      <body className='size-full bg-background font-inter text-foreground antialiased'>
        <RootProviders locale={locale}>
          <div className='scrollbar-thin scrollbar-track-background scrollbar-thumb-primary/40 scrollbar-corner-background scrollbar-thumb-rounded-lg hover:scrollbar-thumb-primary/80 fixed top-0 bottom-0 flex size-full flex-col overflow-y-scroll scroll-smooth'>
            {children}
          </div>
        </RootProviders>
      </body>
    </html>
  );
}
