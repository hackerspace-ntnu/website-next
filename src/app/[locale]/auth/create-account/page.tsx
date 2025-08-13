import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AccountSignUpForm } from '@/components/auth/AccountSignUpForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export default async function CreateAccountPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale });
  }
  if (user.isAccountComplete) {
    return redirect({ href: '/', locale });
  }

  return <AccountSignUpForm />;
}
