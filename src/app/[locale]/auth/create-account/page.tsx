import { AccountSignUpForm } from '@/components/auth/AccountSignUpForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';
import { setRequestLocale } from 'next-intl/server';

export default async function CreateAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale });
  }
  if (!user.emailVerifiedAt) {
    return redirect({ href: '/auth/verify-email', locale });
  }
  if (user.isAccountComplete) {
    return redirect({ href: '/', locale });
  }

  return <AccountSignUpForm />;
}
