import { CheckIcon, XIcon } from 'lucide-react';
import { getFormatter, getTranslations } from 'next-intl/server';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';

async function WaitlistTable({
  event,
}: {
  event: NonNullable<RouterOutput['events']['fetchEvent']>;
}) {
  const t = await getTranslations('events');
  const formatter = await getFormatter();
  const participants = await api.events.fetchEventParticipants(event.id);

  const formatterOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
  } as const;

  return (
    <Table className='my-4'>
      <TableHeader>
        <TableRow>
          <TableHead className='min-w-64'>{t('attendance.person')}</TableHead>
          <TableHead className='min-w-64'>
            {t('attendance.foodPreferences')}
          </TableHead>
          <TableHead className='min-w-24'>
            {t('attendance.photoConsent')}
          </TableHead>
          <TableHead className='min-w-40'>
            {t('waitlist.waitlistedAt')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.waitlisted.map((participant) => (
          <TableRow key={participant.userId}>
            <TableCell>
              <div className='flex items-center gap-4'>
                <MemberAvatar
                  user={participant.user}
                  profilePictureUrl={
                    participant.user.profilePictureUrl ?? undefined
                  }
                  size='md'
                  className='shrink-0'
                />
                <span>
                  {participant.user.firstName} {participant.user.lastName}
                </span>
              </div>
            </TableCell>
            <TableCell>{participant.user.foodPreferences}</TableCell>
            <TableCell>
              {participant.user.photoConsent ? (
                <CheckIcon className='mx-auto' />
              ) : (
                <XIcon className='mx-auto text-destructive' />
              )}
            </TableCell>
            <TableCell className='[&:has([role=checkbox])]:pr-4'>
              {formatter.dateTime(
                participant.waitlistedAt ?? new Date(),
                formatterOptions,
              )}
            </TableCell>
          </TableRow>
        ))}
        {participants.waitlisted.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className='text-center'>
              {t('waitlist.noWaitlisted')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { WaitlistTable };
