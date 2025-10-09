import { Inter, Montserrat } from 'next/font/google';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppCookieConsent } from '@/components/layout/AppCookieConsent';
import { RootProviders } from '@/components/providers/RootProviders';
import { Link } from '@/components/ui/Link';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Toaster } from '@/components/ui/Toaster';
import { routing } from '@/lib/locale';
import { cx } from '@/lib/utils';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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

export async function generateMetadata() {
  const t = await getTranslations('meta');

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

export default async function LocaleLayout({
  params,
  children,
}: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('layout');

  return (
    <html
      className={cx(
        'h-full w-full scroll-smooth',
        inter.variable,
        montserrat.variable,
      )}
      lang={locale}
      dir='ltr'
      suppressHydrationWarning
    >
      <body className='h-full w-full font-inter antialiased'>
        <RootProviders locale={locale as Locale}>
          <ScrollArea className='h-full w-full' variant='primary'>
            <div className='flex h-full w-full flex-col'>
              {children}
              <Toaster />
              <AppCookieConsent
                description={t.rich('cookieConsent', {
                  link: (chunks) => (
                    <Link href='/privacy-policy' variant='link'>
                      {chunks}
                    </Link>
                  ),
                })}
              />
            </div>
          </ScrollArea>
        </RootProviders>
      </body>
    </html>
  );
}
