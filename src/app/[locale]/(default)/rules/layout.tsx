import { unstable_setRequestLocale } from 'next-intl/server';

type RulesLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function RulesLayout({
  children,
  params: { locale },
}: RulesLayoutProps) {
  unstable_setRequestLocale(locale);

  return <>{children}</>;
}
