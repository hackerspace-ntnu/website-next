import { Main } from '@/components/layout/Main';
import { Card } from '@/components/ui/Card';
import { setRequestLocale } from 'next-intl/server';

type SignInLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function SignInLayout({
  children,
  params,
}: SignInLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Main className='flex items-center justify-center'>
      <Card className='~p-4/8 rounded-xl bg-background'>{children}</Card>
    </Main>
  );
}
