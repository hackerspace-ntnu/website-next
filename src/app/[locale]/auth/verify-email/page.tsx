import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { VerifyEmailForm } from '@/components/auth/VerifyEmailForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export default async function VerifyEmailPage({
  params,
}: PageProps<'/[locale]/auth/verify-email'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale: locale as Locale });
  }

  return <VerifyEmailForm />;
}
