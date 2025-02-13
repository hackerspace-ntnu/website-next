import { PendingBar, PendingProvider } from '@/components/auth/PendingBar';
import { LogoLink } from '@/components/layout/LogoLink';
import { Main } from '@/components/layout/Main';
import { AnimatePresenceProvider } from '@/components/providers/AnimatePresenceProvider';
import { Card, CardHeader } from '@/components/ui/Card';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

type AuthLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('signIn'),
  };
}

export const dynamic = 'force-dynamic';

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('layout');
  const { auth, ui } = await getMessages();

  return (
    <Main className='flex h-full items-center justify-center'>
      <Card className='~p-3/6 relative z-10 w-full max-w-md overflow-hidden'>
        <PendingProvider>
          <PendingBar />
          <CardHeader className='flex items-center justify-between py-2'>
            <LogoLink
              logoClassName='h-7 w-7'
              titleClassName='text-lg'
              t={{
                hackerspaceHome: t('hackerspaceHome'),
              }}
            />
          </CardHeader>
          <div className='~min-[24rem]/xs:~h-112/96'>
            <NextIntlClientProvider
              messages={{ auth, ui } as Pick<Messages, 'auth' | 'ui'>}
            >
              <AnimatePresenceProvider className='absolute left-0 flex w-full justify-center'>
                <div className='~px-3/6 ~min-[24rem]/xs:~h-112/96 w-full max-w-md overflow-hidden'>
                  {children}
                </div>
              </AnimatePresenceProvider>
            </NextIntlClientProvider>
          </div>
        </PendingProvider>
      </Card>
    </Main>
  );
}
