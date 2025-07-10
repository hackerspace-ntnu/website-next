import { api } from '@/lib/api/server';
import type { SelectUser } from '@/server/db/tables';
import { CircleUserRoundIcon } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function GroupPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const group = await api.about.fetchGroup(name);

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
    <div className='flex flex-col items-center justify-center gap-4 p-4'>
      <h1 className='mb-4'>{groupLocalization.name}</h1>
      <h3>{groupLocalization.summary}</h3>
      <p className='max-w-prose'>{groupLocalization.description}</p>
      <div className='my-6 grid grid-cols-3 grid-rows-auto content-end gap-8'>
        {members.map((member) => {
          return (
            <div
              key={member.id}
              className='flex items-center justify-center self-center transition-colors duration-300 hover:bg-gray-200'
            >
              <div className='group relative flex h-80 w-80 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 text-white transition-colors duration-300 ease-in-out group-hover:bg-accent group-hover:dark:bg-card '>
                <div className='relative z-10 h-44 w-44 self-center'>
                  {member?.profilePictureUrl ? (
                    <Image
                      className='object-cover'
                      src={member.profilePictureUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      fill
                    />
                  ) : (
                    <CircleUserRoundIcon className='h-full w-full' />
                  )}
                </div>
                <p className='self-center bg-[length:0%_2px] bg-gradient-to-r bg-left-bottom from-white to-white bg-no-repeat transition-all duration-350 ease-out group-hover:bg-[length:100%_2px]'>
                  {member.firstName} {member.lastName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
