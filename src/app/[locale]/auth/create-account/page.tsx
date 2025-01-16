import { AccountSignUpForm } from '@/components/auth/AccountSignUpForm';
import { setRequestLocale } from 'next-intl/server';

export default async function CreateAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AccountSignUpForm />;
}
