import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AccountSignInForm } from '@/components/auth/AccountSignInForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export async function generateMetadata() {
  const t = await getTranslations('auth');

  return {
    title: t('signIn'),
  };
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();

  if (user) {
    if (!user.isAccountComplete) {
      return redirect({ href: '/auth/create-account', locale });
    }
    return redirect({ href: '/', locale });
  }

  return <AccountSignInForm />;
}
