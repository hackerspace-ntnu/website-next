import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AccountSignUpForm } from '@/components/auth/AccountSignUpForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export async function generateMetadata() {
  const t = await getTranslations('auth');

  return {
    title: t('createAccount'),
  };
}

export default async function CreateAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale: locale as Locale });
  }
  if (user.isAccountComplete) {
    return redirect({ href: '/', locale: locale as Locale });
  }

  return <AccountSignUpForm />;
}
