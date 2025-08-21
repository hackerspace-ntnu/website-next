import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NotificationsForm } from '@/components/settings/NotificationsForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export async function generateMetadata() {
  const t = await getTranslations('settings.notifications');

  return {
    title: t('title'),
  };
}

export default async function NotificationsPage({
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

  return <NotificationsForm notifications='useful' />;
}
