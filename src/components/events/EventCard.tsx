'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';
import type { events } from '@/mock-data/events';
import { format } from 'date-fns';

type EventCardProps = {
  event: (typeof events)[number];
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
  const formattedStartDate = format(event.startTime, 'HH:mm, dd.MM.yyyy');
  const formattedEndDate = format(event.endTime, 'HH:mm, dd.MM.yyyy');

  const started = event.startTime < new Date() || _active;
  const ended = event.endTime < new Date();

  return (
    <Link
      href={{ pathname: '/events/[id]', params: { id: event.id } }}
      aria-label={t.detailsAboutEvent}
      className={cx(
        'rounded-md border border-transparent ring-offset-background transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        wrapperClassName,
      )}
    >
      <Card
        className={cx('flex flex-col text-center', cardClassName, {
          'bg-secondary': started && !ended,
        })}
      >
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.subheader}</CardDescription>
          {event.internal && (
            <Badge className='mx-auto w-fit rounded-full hover:bg-primary'>
              {t.internal}
            </Badge>
          )}
        </CardHeader>
        <CardContent className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-center'>
          <p className='max-w-prose'>{event.description}</p>
          <Avatar className='h-48 w-48'>
            <AvatarImage
              src='/event.webp'
              alt={t.photoOf}
              className='object-cover'
            />
          </Avatar>
        </CardContent>
        <CardFooter className='mt-auto flex-col'>
          <p>
            <strong>{started ? <>{t.startedAt}</> : <>{t.startsAt}</>}</strong>{' '}
            {formattedStartDate}
          </p>
          <p className='[&:not(:first-child)]:mt-2'>
            <strong>{ended ? <>{t.endedAt}</> : <>{t.endsAt}</>}</strong>{' '}
            {formattedEndDate}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export { EventCard };
