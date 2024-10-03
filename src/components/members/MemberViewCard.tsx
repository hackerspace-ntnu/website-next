'use client';
import { MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ExternalLink from 'next/link';

import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/assets/icons';
import { InternalBadge } from '@/components/members/InternalBadge';
import {
  MemberCard,
  type MemberCardProps,
} from '@/components/members/MemberCard';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { toast } from 'sonner';

function MemberViewCard({
  className,
  id,
  internal,
  name,
  group,
  photoUrl,
  bio,
  mail,
  instagram,
  discord,
  github,
  linkedin,
}: MemberCardProps) {
  const t = useTranslations('layout');
  return (
    <Card className='relative flex w-2/5 overflow-hidden rounded-xl '>
      <InternalBadge internal={internal} />

      <div className='flex w-full flex-col items-center justify-center'>
        <div className='relative m-6 size-64'>
          <Image
            className='rounded-full object-cover'
            src={`/${photoUrl}`}
            alt={name}
            fill
          />
        </div>
        <h3 className='mt-4 text-center'>{name}</h3>
        <h5 className='text-center'>{group}</h5>
        <p className='m-10 text-center'>{bio}</p>

        <ul className='grid grid-flow-row grid-cols-2-auto justify-start text-foreground/80 sm:grid-cols-3-auto xl:grid-flow-col xl:grid-cols-none'>
          <li>
            <Button asChild variant='ghost' size='sm-icon'>
              <ExternalLink
                href={`https://github.com/${github}`}
                prefetch={false}
                aria-label={t('visitGithub')}
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHubIcon className='h-4 w-4' />
              </ExternalLink>
            </Button>
          </li>
          <li>
            <Button asChild variant='ghost' size='sm-icon'>
              <ExternalLink
                href={linkedin}
                prefetch={false}
                aria-label={t('visitLinkedin')}
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInIcon className='h-4 w-4' />
              </ExternalLink>
            </Button>
          </li>
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
                        navigator.clipboard.writeText(discord);
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
                  <p>{discord}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <Button asChild variant='ghost' size='sm-icon'>
              <ExternalLink
                href={`https://www.instagram.com/${instagram}`}
                prefetch={false}
                aria-label={t('visitInstagram')}
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstagramIcon className='h-4 w-4' />
              </ExternalLink>
            </Button>
          </li>
          <li>
            <Button asChild variant='ghost' size='sm-icon'>
              <ExternalLink
                href={`mailto:${mail}`}
                aria-label={t('sendAnEmail')}
              >
                <MailIcon className='h-4 w-4' />
              </ExternalLink>
            </Button>
          </li>
        </ul>
      </div>

      {/*
          <CardHeader className='mt-auto w-full p-4 lg:p-6'>
            <CardTitle className='line-clamp-1 text-lg transition-colors group-hover:text-primary sm:text-xl lg:text-2xl'>
              {name}
            </CardTitle>
            <CardDescription className='line-clamp-1 text-xs sm:text-sm'>hei</CardDescription>
          </CardHeader> */}
    </Card>
  );
}

export { MemberViewCard, type MemberCardProps };
