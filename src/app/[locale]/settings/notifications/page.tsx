import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NotificationsForm } from '@/components/settings/NotificationsForm';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export async function generateMetadata({
  params,
}: Pick<PageProps<'/[locale]/settings/notifications'>, 'params'>) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'settings.notifications',
  });

  return {
    title: t('title'),
  };
}

export default async function NotificationsPage({
  params,
}: PageProps<'/[locale]/settings/notifications'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale: locale as Locale });
  }

  return <NotificationsForm notifications='useful' />;
}
