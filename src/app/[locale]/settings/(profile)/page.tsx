import { ProfileForm } from '@/components/settings/ProfileForm';
import { ProfilePictureForm } from '@/components/settings/ProfilePictureForm';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
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

  const userInitials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <>
      <div className='flex items-center gap-2'>
        <h2 className='font-semibold text-2xl tracking-tight'>
          {user.username}
        </h2>
        <Badge variant='secondary'>username</Badge>
      </div>
      <Separator className='mt-2 mb-4' />
      <ProfilePictureForm currentImageUrl={''} userInitials={userInitials} />
      <Separator className='my-4' />
      <ProfileForm
        firstName={user.firstName}
        lastName={user.lastName}
        birthDate={user.birthDate}
      />
    </>
  );
}
