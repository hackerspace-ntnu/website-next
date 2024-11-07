import { AccountSignInForm } from '@/components/auth/AccountSignInForm';
import { setRequestLocale } from 'next-intl/server';

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AccountSignInForm />;
}
