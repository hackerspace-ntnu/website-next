import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { unstable_setRequestLocale } from 'next-intl/server';

type DefaultLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DefaultLayout(props: DefaultLayoutProps) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  unstable_setRequestLocale(locale);
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
