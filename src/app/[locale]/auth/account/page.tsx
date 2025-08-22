import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AccountSignInForm } from '@/components/auth/AccountSignInForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export default async function AccountPage({
  params,
}: PageProps<'/[locale]/auth/account'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

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

  return <AccountSignInForm />;
}
