import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';

export const dynamic = 'force-dynamic';

export default async function DefaultLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
