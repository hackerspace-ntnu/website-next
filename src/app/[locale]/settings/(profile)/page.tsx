import { ProfileForm } from '@/components/settings/ProfileForm';
import { api } from '@/lib/api/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();

  if (!user) {
    notFound();
  }

  return (
    <ProfileForm
      firstName={user.firstName}
      lastName={user.lastName}
      birthDate={user.birthDate}
    />
  );
}
