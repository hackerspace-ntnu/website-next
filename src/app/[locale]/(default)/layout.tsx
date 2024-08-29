import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { unstable_setRequestLocale } from 'next-intl/server';

type DefaultLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function DefaultLayout({
  children,
  params: { locale },
}: DefaultLayoutProps) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
