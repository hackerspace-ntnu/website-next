import { AccountSignInForm } from '@/components/auth/AccountSignInForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';
import { setRequestLocale } from 'next-intl/server';

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();

  if (user) {
    if (!user.isAccountComplete) {
      redirect({ href: '/auth/create-account', locale });
    }
    redirect({ href: '/', locale });
  }

  return <AccountSignInForm />;
}
