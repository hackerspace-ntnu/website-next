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
      return redirect({ href: '/auth/create-account', locale });
    }
    if (!user.emailVerifiedAt) {
      return redirect({ href: '/auth/verify-email', locale });
    }
    return redirect({ href: '/', locale });
  }

  return <AccountSignInForm />;
}
