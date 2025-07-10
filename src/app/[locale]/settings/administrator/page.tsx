import { api } from '@/lib/api/server';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations('settings.administrator');

  return {
    title: t('title'),
  };
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();

  const showAdministratorMenu = user?.groups.some(
    (group) => group === 'leadership' || group === 'admin',
  );

  if (!showAdministratorMenu) {
    return notFound();
  }

  return (
    <div>
      <h1>admin?</h1>
      <p>
        We should have multiple admin utilities here. Including a way to display
        and add/remove people from different groups. Maybe also giving skills
        but that should probably be handled by events instead.
      </p>
    </div>
  );
}
