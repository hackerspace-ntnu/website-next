import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProfileForm } from '@/components/settings/ProfileForm';
import { ProfilePictureForm } from '@/components/settings/ProfilePictureForm';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

export async function generateMetadata() {
  const t = await getTranslations('settings.profile');

  return {
    title: t('title'),
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('settings.profile');

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale });
  }

  const profilePictureUrl = user.profilePictureId
    ? await api.utils.getFileUrl({ fileId: user.profilePictureId })
    : undefined;

  const userInitials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <>
      <div className='flex items-center gap-2'>
        <h2 className='font-semibold text-2xl tracking-tight'>
          {user.username}
        </h2>
        <Badge variant='secondary'>{t('username')}</Badge>
      </div>
      <Separator className='mt-2 mb-4' />
      <ProfilePictureForm
        profilePictureUrl={profilePictureUrl}
        userInitials={userInitials}
      />
      <Separator className='my-4' />
      <ProfileForm
        firstName={user.firstName}
        lastName={user.lastName}
        birthDate={user.birthDate}
      />
    </>
  );
}
