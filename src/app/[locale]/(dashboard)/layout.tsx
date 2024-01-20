import { unstable_setRequestLocale } from 'next-intl/server';
import { type ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';

export default function Dashboardlayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
