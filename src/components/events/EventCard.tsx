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
import { cx } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type EventCardProps = {
  id: number;
  title: string;
  subheader: string;
  description: string;
  imagePath?: string;
  startTime: Date;
  endTime: Date;
  internal: boolean;
  locale: string;
  wrapperClassName?: string;
  cardClassName?: string;
  _active?: boolean;
};

/**
 * A card for an event.
 * Only set the _active prop to true if you're testing active events.
 */
async function EventCard(props: EventCardProps) {
  const t = await getTranslations('events');

  const dateOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  } as const;

  // For example "18:00", same for end time
  const formattedStartTime = props.startTime.toLocaleTimeString(
    props.locale,
    dateOptions,
  );
  // For example "22/8/2024" or "22.8.2024", same for end date
  const formattedStartDate = props.startTime.toLocaleDateString(props.locale);
  const formattedEndTime = props.endTime.toLocaleTimeString(
    props.locale,
    dateOptions,
  );
  const formattedEndDate = props.endTime.toLocaleDateString(props.locale);

  const started = props.startTime < new Date() || props._active;
  const ended = props.endTime < new Date();

  return (
    <Link
      href={`/events/${props.id}`}
      aria-label={t('detailsAboutEvent', { eventName: props.title })}
      className={props.wrapperClassName}
    >
      <Card
        className={cx('flex flex-col text-center', props.cardClassName, {
          'bg-secondary': started && !ended,
        })}
      >
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.subheader}</CardDescription>
          {props.internal && (
            <Badge className='mx-auto w-fit rounded-full'>Internal</Badge>
          )}
        </CardHeader>
        <CardContent className='flex flex-col-reverse items-center gap-2 md:flex-row md:justify-between'>
          <p>{props.description}</p>
          <Avatar className='h-48 w-48'>
            <AvatarImage
              src='/event.webp'
              alt={`Photo of ${props.title}`}
              className='object-cover'
            />
          </Avatar>
        </CardContent>
        <CardFooter className='mt-auto flex-col gap-2'>
          <span>
            {started ? <>{t('startedAt')}</> : <>{t('startsAt')}</>}{' '}
            {formattedStartTime}, {formattedStartDate}
          </span>
          <span>
            {ended ? <>{t('endedAt')}</> : <>{t('endsAt')}</>}{' '}
            {formattedEndTime}, {formattedEndDate}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export { EventCard };
