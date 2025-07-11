import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/assets/icons';
import { InternalBadge } from '@/components/members/InternalBadge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';
import { MailIcon, UserCircle2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import ExternalLink from 'next/link';
import { toast } from 'sonner';

async function MemberViewCard({
  user,
}: {
  user: NonNullable<RouterOutput['users']['fetchUser']>;
}) {
  const t = useTranslations('layout');
  const tMembers = useTranslations('members');
  const locale = await getLocale();
  const profilePictureUrl = user.profilePictureId
    ? await api.utils.getFileUrl({
        fileId: user.profilePictureId,
      })
    : null;

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
        <div className='relative my-2 size-48 lg:size-64'>
          {profilePictureUrl ? (
            <Image
              className='rounded-full object-cover'
              src={profilePictureUrl}
              alt={`${user.firstName} ${user.lastName}`}
              fill
            />
          ) : (
            <UserCircle2Icon className='h-full w-full object-cover' />
          )}
        </div>
        <h3 className='mt-4 text-center'>
          {user.firstName} {user.lastName}
        </h3>
        <h5 className='my-4 text-center'>
          {groupNames.length > 0 ? groupNames : tMembers('guest')}
        </h5>
        {user.bio && user.bio.length > 0 && (
          <p className='my-6 max-w-prose text-center'>{user.bio}</p>
        )}
        <ul className='mb-5 flex flex-wrap justify-center gap-1 sm:grid sm:grid-cols-3-auto md:grid-flow-col xl:grid-flow-col xl:grid-cols-none md:xl:grid-cols-none'>
          {user.gitHubUsername && (
            <li>
              <Button asChild variant='ghost' size='sm-icon'>
                <ExternalLink
                  href={`https://github.com/${user.gitHubUsername}`}
                  prefetch={false}
                  aria-label={t('visitGithub')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GitHubIcon className='h-4 w-4' />
                </ExternalLink>
              </Button>
            </li>
          )}
          {user.linkedInUsername && (
            <li>
              <Button asChild variant='ghost' size='sm-icon'>
                <ExternalLink
                  href={`https://linkedin.com/in/${user.linkedInUsername}`}
                  prefetch={false}
                  aria-label={t('visitLinkedin')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <LinkedInIcon className='h-4 w-4' />
                </ExternalLink>
              </Button>
            </li>
          )}
          {user.discordUsername && (
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant='ghost'
                      size='sm-icon'
                      onClick={() => toast('Username copied')}
                    >
                      <ExternalLink
                        onClick={() => {
                          navigator.clipboard.writeText(
                            user.discordUsername as string,
                          );
                        }}
                        href=''
                        prefetch={false}
                        aria-label={t('discordTag')}
                        rel='noopener noreferrer'
                      >
                        <DiscordIcon className='h-4 w-4' />
                      </ExternalLink>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-background'>
                    <p>{user.discordUsername}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          )}
          {user.instagramUsername && (
            <li>
              <Button asChild variant='ghost' size='sm-icon'>
                <ExternalLink
                  href={`https://www.instagram.com/${user.instagramUsername}`}
                  prefetch={false}
                  aria-label={t('visitInstagram')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <InstagramIcon className='h-4 w-4' />
                </ExternalLink>
              </Button>
            </li>
          )}
          <li>
            <Button asChild variant='ghost' size='sm-icon'>
              <ExternalLink
                href={`mailto:${user.email}`}
                aria-label={t('sendAnEmail')}
              >
                <MailIcon className='h-4 w-4' />
              </ExternalLink>
            </Button>
          </li>
        </ul>
      </div>
    </Card>
  );
}

export { MemberViewCard };
