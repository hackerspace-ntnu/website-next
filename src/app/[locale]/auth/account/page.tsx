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
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { r: redirectTo } = await searchParams;

  const { user } = await api.auth.state();

  if (user) {
    if (!user.isAccountComplete) {
      return redirect({
        href: '/auth/create-account',
        locale: locale as Locale,
      });
    }
    return redirect({ href: '/', locale: locale as Locale });
  }

  return <AccountSignInForm redirectTo={redirectTo} />;
}
