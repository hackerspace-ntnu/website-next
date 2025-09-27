import { MailIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/assets/icons';
import { DiscordMemberTag } from '@/components/members/DiscordMemberTag';
import { InternalBadge } from '@/components/members/InternalBadge';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import { Card } from '@/components/ui/Card';
import { ExternalLink } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';

async function MemberInfoCard({
  user,
}: {
  user: NonNullable<RouterOutput['users']['fetchMember']>;
}) {
  const t = await getTranslations('layout');
  const tMembers = await getTranslations('members');
  const locale = await getLocale();
  const profilePictureUrl = user.profilePictureId
    ? await api.utils.getFileUrl({
        fileId: user.profilePictureId,
      })
    : undefined;

  const groupNames = user.usersGroups
    .map(
      (row) =>
        row.group.localizations.find(
          (localization) => localization.locale === locale,
        )?.name,
    )
    .filter((item) => item !== undefined)
    .join(', ');

  return (
    <Card className='relative flex w-full overflow-hidden rounded-xl p-4 lg:w-fit lg:min-w-96'>
      {user.private && <InternalBadge />}
      <div className='flex w-full flex-col items-center justify-center'>
        <MemberAvatar
          size='2xl'
          user={user}
          profilePictureUrl={profilePictureUrl}
          className='relative my-2'
        />
        <h3 className='mt-4 text-center'>
          {user.firstName} {user.lastName}
        </h3>
        <h5 className='text-center'>
          {groupNames.length > 0 ? groupNames : tMembers('guest')}
        </h5>
        {user.bio && user.bio.length > 0 && (
          <p className='my-8 max-w-prose text-center'>{user.bio}</p>
        )}
        <ul className='mb-5 flex justify-center divide-x sm:grid sm:grid-cols-3-auto md:grid-flow-col xl:grid-flow-col xl:grid-cols-none md:xl:grid-cols-none [&>li]:px-2'>
          <li>
            <ExternalLink
              href={`mailto:${user.email}`}
              aria-label={t('sendAnEmail')}
              variant='ghost'
              size='sm-icon'
            >
              <MailIcon className='h-6 w-6' />
            </ExternalLink>
          </li>
          {user.gitHubUsername && (
            <li>
              <ExternalLink
                href={`https://github.com/${user.gitHubUsername}`}
                prefetch={false}
                aria-label={t('visitGithub')}
                target='_blank'
                rel='noopener noreferrer'
                variant='ghost'
                size='sm-icon'
              >
                <GitHubIcon className='h-6 w-6' />
              </ExternalLink>
            </li>
          )}
          {user.discordUsername && (
            <li>
              <DiscordMemberTag
                user={user}
                t={{
                  discordTag: t('discordTag'),
                  usernameCopied: tMembers('usernameCopied'),
                }}
              />
            </li>
          )}
          {user.linkedInUsername && (
            <li>
              <ExternalLink
                href={`https://linkedin.com/in/${user.linkedInUsername}`}
                prefetch={false}
                aria-label={t('visitLinkedin')}
                target='_blank'
                rel='noopener noreferrer'
                variant='ghost'
                size='sm-icon'
              >
                <LinkedInIcon className='h-6 w-6' />
              </ExternalLink>
            </li>
          )}
          {user.instagramUsername && (
            <li>
              <ExternalLink
                href={`https://www.instagram.com/${user.instagramUsername}`}
                prefetch={false}
                aria-label={t('visitInstagram')}
                target='_blank'
                rel='noopener noreferrer'
                variant='ghost'
                size='sm-icon'
              >
                <InstagramIcon className='h-6 w-6' />
              </ExternalLink>
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
}

export { MemberInfoCard };
