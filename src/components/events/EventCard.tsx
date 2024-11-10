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
            <Badge className='mx-auto w-fit rounded-full'>
              {tUi('internal')}
            </Badge>
          )}
        </CardHeader>
        <CardContent className='flex flex-col-reverse items-center gap-2 md:flex-row md:justify-between'>
          <p>{event.description}</p>
          <Avatar className='h-48 w-48'>
            <AvatarImage
              src='/event.webp'
              alt={`Photo of ${event.title}`}
              className='object-cover'
            />
          </Avatar>
        </CardContent>
        <CardFooter className='mt-auto flex-col gap-2'>
          <span>
            {started ? <>{t('startedAt')}</> : <>{t('startsAt')}</>}{' '}
            {formattedStartDate}
          </span>
          <span>
            {ended ? <>{t('endedAt')}</> : <>{t('endsAt')}</>}{' '}
            {formattedEndDate}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export { EventCard };
