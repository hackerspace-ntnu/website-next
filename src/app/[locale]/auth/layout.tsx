import { PendingBar, PendingProvider } from '@/components/auth/PendingBar';
import { LogoLink } from '@/components/layout/LogoLink';
import { Main } from '@/components/layout/Main';
import { AnimatePresenceProvider } from '@/components/providers/AnimatePresenceProvider';
import { Card, CardHeader } from '@/components/ui/Card';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

type AuthLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  const t = await getTranslations('layout');

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
    <Main className='flex h-full min-h-screen items-center justify-center'>
      <Card className='clamp-[p-3/6] relative z-10 w-full max-w-md overflow-hidden'>
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
          <div className='clamp-[h-112/96-sm/md]'>
            <NextIntlClientProvider
              messages={{ auth, ui } as Pick<Messages, 'auth' | 'ui'>}
            >
              <AnimatePresenceProvider className='absolute left-0 flex w-full justify-center'>
                <div className='clamp-[px-3/6] clamp-[h-112/96-2xs/xs] w-full max-w-md overflow-hidden'>
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
