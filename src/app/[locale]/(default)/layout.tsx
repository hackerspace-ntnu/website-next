import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Banner } from '@/components/layout/Banner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';

type DefaultLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

export default async function DefaultLayout({
  children,
  params,
}: DefaultLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { home, ui, error } = await getMessages();

  return (
    <>
      <Header />
      <NextIntlClientProvider
        messages={
          { home, ui, error } as Pick<Messages, 'home' | 'ui' | 'error'>
        }
      >
        <Banner />
      </NextIntlClientProvider>
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
