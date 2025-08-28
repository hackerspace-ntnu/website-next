import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NewPasswordForm } from '@/components/auth/NewPasswordForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('forgotPassword'),
  };
}

export default async function ForgotPasswordRequestPage({
  params,
}: {
  params: Promise<{ locale: Locale; requestId: string }>;
}) {
  const { locale, requestId } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();

  if (user) {
    redirect({ href: '/', locale });
  }

  return <NewPasswordForm requestId={requestId} />;
}
