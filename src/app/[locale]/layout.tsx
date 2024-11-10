import { RootProviders } from '@/components/providers/RootProviders';
import { Toaster } from '@/components/ui/Toaster';
import { routing } from '@/lib/locale';
import { cx } from '@/lib/utils';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter, Montserrat } from 'next/font/google';

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

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, 'children'>) {
  const { locale } = await params;
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

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  setRequestLocale(locale);
  return (
    <html
      className={cx('h-full w-full', inter.variable, montserrat.variable)}
      lang={locale}
      dir='ltr'
      suppressHydrationWarning
    >
      <body className='h-full w-full bg-background font-inter text-foreground antialiased'>
        <RootProviders locale={locale}>
          <div className='scrollbar-thin scrollbar-track-background scrollbar-thumb-primary/40 scrollbar-corner-background scrollbar-thumb-rounded-lg hover:scrollbar-thumb-primary/80 fixed top-0 bottom-0 flex h-full w-full flex-col overflow-y-scroll scroll-smooth'>
            {children}
            <Toaster />
          </div>
        </RootProviders>
      </body>
    </html>
  );
}
