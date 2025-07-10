import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import type { SelectUser } from '@/server/db/tables';
import { ArrowLeftIcon, CircleUserRoundIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function GroupPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const group = await api.about.fetchGroup(name);
  const t = await getTranslations('about');

  if (!group) {
    return notFound();
  }

  const locale = await getLocale();
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
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <h1 className='mb-4'>{groupLocalization.name}</h1>
        <h3>{groupLocalization.summary}</h3>
        <p className='max-w-prose'>{groupLocalization.description}</p>
        {members.length === 0 && (
          <p className='text-center'>No members in this group yet.</p>
        )}
        <div className='my-6 grid grid-cols-3 grid-rows-auto content-end gap-8'>
          {members.map((member) => {
            return (
              <Link
                key={member.id}
                href={{
                  // @ts-expect-error Page not implemented yet
                  pathname: '/members/[id]',
                  params: { id: member.id },
                }}
                className='group relative box-border border border-border flex h-80 w-80 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 text-white duration-200 hover:border-primary'
              >
                <div className='relative z-10 h-44 w-44 self-center'>
                  {member?.profilePictureUrl ? (
                    <Image
                      className='object-cover duration-200 group-hover:scale-105'
                      src={member.profilePictureUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      fill
                    />
                  ) : (
                    <CircleUserRoundIcon className='h-full w-full object-cover duration-200 group-hover:scale-105' />
                  )}
                </div>
                <p className='group-hover:text-primary duration-200'>
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
