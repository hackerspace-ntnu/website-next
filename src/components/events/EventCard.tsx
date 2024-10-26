import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { cx } from '@/lib/utils';

type EventCardProps = {
  title: string;
  subheader: string;
  description: string;
  imagePath: string;
  startTime: Date;
  endTime: Date;
  _active?: boolean;
};

/**
 * A card for an event.
 * Only set the _active prop to true if you're testing active events.
 */
function EventCard(props: EventCardProps) {
  const dateOptions = { hour: '2-digit', minute: '2-digit' } as const;
  const formattedStartTime = props.startTime.toLocaleTimeString(
    'en-GB',
    dateOptions,
  );
  const formattedStartDate = props.startTime.toLocaleDateString('en-GB');
  const formattedEndTime = props.endTime.toLocaleTimeString(
    'en-GB',
    dateOptions,
  );
  const formattedEndDate = props.endTime.toLocaleDateString('en-GB');

  const started = props.startTime < new Date() || props._active;
  const ended = props.endTime < new Date();

  return (
    <Card className={cx('text-center', { 'bg-secondary': started && !ended })}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.subheader}</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-between gap-2'>
        <p>{props.description}</p>
        <Avatar className='h-48 w-48'>
          <AvatarImage src='/event.webp' className='object-cover' />
        </Avatar>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <span>
          {started ? <>Started at</> : <>Starts at</>} {formattedStartTime},{' '}
          {formattedStartDate}
        </span>
        <span>
          {ended ? <>Ended at</> : <>Ends at</>} {formattedEndTime},{' '}
          {formattedEndDate}
        </span>
      </CardFooter>
    </Card>
  );
}

export { EventCard };
