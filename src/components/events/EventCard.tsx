'use client';

import { useFormatter, useLocale } from 'next-intl';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/client';
import { cx } from '@/lib/utils';
import type {
  SelectEvent,
  SelectEventLocalization,
  SelectSkill,
} from '@/server/db/tables';

type EventCardProps = {
  event: SelectEvent & { localization: SelectEventLocalization } & {
    skill?: SelectSkill | null;
  } & {
    imageUrl?: string;
  };
  wrapperClassName?: string;
  cardClassName?: string;
  _active?: boolean;
  t: {
    detailsAboutEvent: string;
    internal: string;
    photoOf: string;
    startsAt: string;
    startedAt: string;
    endsAt: string;
    endedAt: string;
  };
};

/**
 * A card for an event.
 * Only set the _active prop to true if you're testing active events.
 */
function EventCard({
  event,
  wrapperClassName,
  cardClassName,
  t,
  _active,
}: EventCardProps) {
  const formatter = useFormatter();
  const imageUrlQuery = api.utils.getFileUrl.useQuery(
    { fileId: event.imageId ?? 0 },
    { enabled: !!event.imageId },
  );

  const imageUrl = event.imageId ? imageUrlQuery.data : undefined;
  const locale = useLocale();

  if (!event.localization) return;

  const started = event.startTime < new Date() || _active;
  const ended = event.endTime < new Date();

  return (
    <Link
      href={{ pathname: '/events/[eventId]', params: { eventId: event.id } }}
      aria-label={t.detailsAboutEvent}
      className={cx(
        'block rounded-md border border-transparent ring-offset-background transition-colors hover:border-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        wrapperClassName,
      )}
    >
      <Card
        className={cx('flex flex-col text-center', cardClassName, {
          'bg-secondary': started && !ended,
        })}
      >
        <CardHeader>
          <CardTitle>{event.localization.name}</CardTitle>
          {event.internal && (
            <Badge className='mx-auto w-fit rounded-full hover:bg-primary'>
              {t.internal}
            </Badge>
          )}
        </CardHeader>
        <CardContent className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-center'>
          <div>
            <p className='line-clamp-5 max-w-96'>
              {event.localization.summary}
            </p>
            <div className='mt-2 flex items-center justify-center gap-2'>
              {event.skill && (
                <>
                  <SkillIcon skill={event.skill} size='large' />
                  <span className='font-bold'>
                    {locale === 'en-GB'
                      ? event.skill?.nameEnglish
                      : event.skill?.nameNorwegian}
                  </span>
                </>
              )}
            </div>
          </div>
          {imageUrl && (
            <Avatar className='h-48 w-48 shrink-0'>
              <AvatarImage
                src={imageUrl}
                alt={t.photoOf}
                className='object-cover'
              />
            </Avatar>
          )}
        </CardContent>
        <CardFooter className='mt-auto flex-col'>
          <p>
            <strong>{started ? t.startedAt : t.startsAt}</strong>{' '}
            {formatter.dateTime(event.startTime, {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </p>
          <p className='[&:not(:first-child)]:mt-2'>
            <strong>{ended ? t.endedAt : t.endsAt}</strong>{' '}
            {formatter.dateTime(event.endTime, {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export { EventCard };
