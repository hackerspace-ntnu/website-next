import { Main } from '@/components/layout/Main';
import { Card } from '@/components/ui/Card';
import { unstable_setRequestLocale } from 'next-intl/server';

type DefaultLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function SignInLayout({
  children,
  params: { locale },
}: DefaultLayoutProps) {
  unstable_setRequestLocale(locale);
  return (
    <Main className='flex items-center justify-center'>
      <Card className='~p-4/8 rounded-xl bg-background'>{children}</Card>
    </Main>
  );
}