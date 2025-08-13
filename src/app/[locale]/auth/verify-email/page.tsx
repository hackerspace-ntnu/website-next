import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { VerifyEmailForm } from '@/components/auth/VerifyEmailForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export default async function VerifyEmailPage({
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

  return <VerifyEmailForm />;
}
