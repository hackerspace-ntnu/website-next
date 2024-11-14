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
import { getTranslations } from 'next-intl/server';

type EventCardProps = {
  event: (typeof events)[number];
  wrapperClassName?: string;
  cardClassName?: string;
  _active?: boolean;
};

/**
 * A card for an event.
 * Only set the _active prop to true if you're testing active events.
 */
async function EventCard({
  event,
  wrapperClassName,
  cardClassName,
  _active,
}: EventCardProps) {
  const t = await getTranslations('events');
  const tUi = await getTranslations('ui');

  const formattedStartDate = format(event.startTime, 'HH:mm, dd.MM.yyyy');
  const formattedEndDate = format(event.endTime, 'HH:mm, dd.MM.yyyy');

  const started = event.startTime < new Date() || _active;
  const ended = event.endTime < new Date();

  return (
    <Link
      href={{ pathname: '/events/[id]', params: { id: event.id } }}
      aria-label={t('detailsAboutEvent', { eventName: event.title })}
      className={wrapperClassName}
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
              {tUi('internal')}
            </Badge>
          )}
        </CardHeader>
        <CardContent className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-center'>
          <p className='max-w-prose'>{event.description}</p>
          <Avatar className='h-48 w-48'>
            <AvatarImage
              src='/event.webp'
              alt={tUi('photoOf', { name: event.title })}
              className='object-cover'
            />
          </Avatar>
        </CardContent>
        <CardFooter className='mt-auto flex-col'>
          <p>
            {started ? <>{t('startedAt')}</> : <>{t('startsAt')}</>}{' '}
            {formattedStartDate}
          </p>
          <p className='[&:not(:first-child)]:mt-2'>
            {ended ? <>{t('endedAt')}</> : <>{t('endsAt')}</>}{' '}
            {formattedEndDate}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export { EventCard };
