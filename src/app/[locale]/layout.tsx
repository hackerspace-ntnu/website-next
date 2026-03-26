import { Comic_Relief } from 'next/font/google';
import { headers } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppCookieConsent } from '@/components/layout/AppCookieConsent';
import { RootProviders } from '@/components/providers/RootProviders';
import { ExternalLink, Link } from '@/components/ui/Link';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Toaster } from '@/components/ui/Toaster';
import { routing } from '@/lib/locale';
import { cx } from '@/lib/utils';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const comicRelief = Comic_Relief({
  subsets: ['latin'],
  variable: '--font-comic-relief',
  display: 'swap',
  weight: ['400', '700'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations('meta');

  return {
    title: {
      template: t('titleTemplate'),
      default: t('titleDefault'),
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
  const tUi = await getTranslations('ui');

  const cookieConsentMessages = {
    title: t('cookieConsent.title'),
    description: t.rich('cookieConsent.description', {
      link: (chunks) => (
        <Link href='/privacy-policy' variant='link'>
          {chunks}
        </Link>
      ),
    }),
    accept: tUi('accept'),
    decline: tUi('decline'),
  };

  const host = (await headers()).get('host') ?? '';

  if (host.includes('hackerspace-ntnu.no')) {
    redirect('https://xn--9t4ba908at7ib6fs3c.website');
  }

  return (
    <html
      className={cx('h-full w-full scroll-smooth', comicRelief.variable)}
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
              <AppCookieConsent t={cookieConsentMessages} />
            </div>
          </ScrollArea>
        </RootProviders>
        <div className='[&>div]:absolute [&>div]:z-50 [&_img]:size-20'>
          <div className='top-5 left-5'>
            <Image src='/tungsten.gif' width={80} height={80} alt='Tungsten' />
          </div>
          <div className='top-5 right-5'>
            <Image src='/tungsten.gif' width={80} height={80} alt='Tungsten' />
          </div>
          <div className='bottom-5 left-5'>
            <Image src='/tungsten.gif' width={80} height={80} alt='Tungsten' />
          </div>
          <div className='right-5 bottom-20'>
            <Image src='/tungsten.gif' width={80} height={80} alt='Tungsten' />
          </div>
          <div className='right-5 bottom-5 rounded-lg bg-red-500 p-2'>
            <ExternalLink
              href='https://makentnu.no'
              className='rotate-0 text-white'
              variant='none'
              target='_blank'
            >
              Dra til et verre sted
            </ExternalLink>
          </div>
        </div>
      </body>
    </html>
  );
}
