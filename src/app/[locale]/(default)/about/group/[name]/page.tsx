import {
  ArrowLeftIcon,
  CircleUserRoundIcon,
  EditIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { PlateEditorView } from '@/components/ui/plate/PlateEditorView';
import { api } from '@/lib/api/server';
import type { SelectUser } from '@/server/db/tables';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; name: string }>;
}) {
  const { locale, name } = await params;

  const group = await api.groups.fetchGroup(name);
  const groupLocalization = group?.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!group || !groupLocalization) return;

  return {
    title: groupLocalization.name,
  };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ locale: string; name: string }>;
}) {
  const { locale, name } = await params;
  setRequestLocale(locale as Locale);

  const group = await api.groups.fetchGroup(name);
  const t = await getTranslations('groups');
  const tAbout = await getTranslations('about');

  if (!group) {
    return notFound();
  }

  const groupLocalization = group.localizations.find(
    (localization) => localization.locale === locale,
  );

  const memberPromises = group.usersGroups.map(async (row) => {
    if (row.user.profilePictureId) {
      return {
        ...row.user,
        profilePictureUrl: await api.utils.getFileUrl({
          fileId: row.user.profilePictureId,
        }),
      };
    }
    return row.user;
  });
  const members = (await Promise.all(memberPromises)) as (SelectUser & {
    profilePictureUrl?: string;
  })[];

  const { user } = await api.auth.state();

  if (!groupLocalization) {
    return notFound();
  }

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/about'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{t('backToAbout')}</span>
      </Link>
      <div className='relative'>
        <h1 className='mb-4 text-center'>{groupLocalization.name}</h1>
        {user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
        ) && (
          <Link
            className='-translate-y-1/2 absolute top-1/2 right-0'
            href={{
              pathname: '/about/group/[name]/edit',
              params: { name: group.identifier },
            }}
            variant='default'
            size='icon'
          >
            <EditIcon />
          </Link>
        )}
      </div>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <h3>{groupLocalization.summary}</h3>
        {group.imageUrl && (
          <div className='relative mx-auto h-auto w-64 max-w-2xl overflow-hidden rounded-lg md:w-96'>
            <Image
              src={group.imageUrl}
              alt={groupLocalization.name}
              width={512}
              height={512}
              className='rounded-lg object-cover'
            />
          </div>
        )}
        <PlateEditorView value={groupLocalization.description} />
        {members.length === 0 && (
          <div className='flex w-full items-center justify-center gap-2'>
            <TriangleAlertIcon className='h-6 w-6 text-yellow-500' />
            <p className='text-center'>{tAbout('noMembers')}</p>
          </div>
        )}
        <div className='my-6 grid grid-cols-1 content-end gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {members.map((member) => {
            return (
              <Link
                key={member.id}
                href={{
                  pathname: '/members/[memberId]',
                  params: { memberId: member.id },
                }}
                className='group relative box-border flex h-72 w-72 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-border bg-card px-10 py-7 text-white duration-200 hover:border-primary'
              >
                <div className='relative h-44 w-44 self-center overflow-hidden rounded-lg object-cover'>
                  {member?.profilePictureUrl ? (
                    <Image
                      className='object-cover duration-200 group-hover:scale-105'
                      src={member.profilePictureUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      fill
                    />
                  ) : (
                    <CircleUserRoundIcon className='h-full w-full duration-200 group-hover:scale-105' />
                  )}
                </div>
                <p className='mt-2 duration-200 group-hover:text-primary'>
                  {member.firstName} {member.lastName}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
