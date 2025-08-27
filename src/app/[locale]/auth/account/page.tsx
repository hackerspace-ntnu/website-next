import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AccountSignInForm } from '@/components/auth/AccountSignInForm';
import { api } from '@/lib/api/server';
import { routing } from '@/lib/locale';
import { redirect } from '@/lib/locale/navigation';

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { r: redirectTo } = await searchParams;

  // Only accept redirect paths that actually exist
  if (redirectTo && !Object.keys(routing.pathnames).includes(redirectTo)) {
    return redirect({ href: '/auth', locale });
  }

  const { user } = await api.auth.state();

  if (user) {
    if (!user.isAccountComplete) {
      return redirect({ href: '/auth/create-account', locale });
    }
    return redirect({ href: '/', locale });
  }

  return <AccountSignInForm redirectTo={redirectTo} />;
}
