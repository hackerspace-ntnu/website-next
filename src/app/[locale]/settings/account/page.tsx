import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AccountForm } from '@/components/settings/AccountForm';
import { PasswordForm } from '@/components/settings/PasswordForm';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export async function generateMetadata() {
  const t = await getTranslations('settings.account');

  return {
    title: t('title'),
  };
}

export default async function AccountPage({
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

  return (
    <>
      <AccountForm phoneNumber={user.phoneNumber} email={user.email} />
      <Separator className='my-4' />
      <PasswordForm />
    </>
  );
}
