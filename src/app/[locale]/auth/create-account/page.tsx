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

  if (user) {
    if (user.isAccountComplete) {
      redirect({ href: '/', locale });
    }
  } else {
    redirect({ href: '/auth', locale });
  }

  return <AccountSignUpForm />;
}
