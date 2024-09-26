import { Main } from '@/components/layout/Main';
import { Card } from '@/components/ui/Card';
import { unstable_setRequestLocale } from 'next-intl/server';

type DefaultLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LoginLayout({
  children,
  params: { locale },
}: DefaultLayoutProps) {
  unstable_setRequestLocale(locale);
  return (
    <Main className='flex items-center justify-center'>
      <Card className='rounded-xl bg-background'>{children}</Card>
    </Main>
  );
}
