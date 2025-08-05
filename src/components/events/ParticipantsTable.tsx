'use client';

import { useTranslations } from 'next-intl';
import { AttendanceCheckbox } from '@/components/events/AttendanceCheckbox';
import { GiveSkillButton } from '@/components/events/GiveSkillButton';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import type { RouterOutput } from '@/server/api';

function ParticipantsTable({
  participants,
  event,
}: {
  participants: RouterOutput['events']['fetchEventParticipants'];
  event: NonNullable<RouterOutput['events']['fetchEvent']>;
}) {
  const t = useTranslations('events.attendance');

  return (
    <Table>
      <TableCaption>{t('attendeesList')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-full'>{t('member')}</TableHead>
          <TableHead>{t('attendance')}</TableHead>
          <TableHead>{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => (
          <TableRow key={participant.userId}>
            <TableCell>
              <div className='flex items-center gap-4'>
                <MemberAvatar
                  user={participant.user}
                  profilePictureUrl={
                    participant.user.profilePictureUrl ?? undefined
                  }
                  size='md'
                />
                <span>
                  {participant.user.firstName} {participant.user.lastName}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <AttendanceCheckbox participant={participant} event={event} />
              </div>
            </TableCell>
            <TableCell>
              {participant.attended && event.skill && (
                <GiveSkillButton event={event} participant={participant} />
              )}
            </TableCell>
          </TableRow>
        ))}
        {participants.length === 0 && (
          <TableRow>
            <TableCell colSpan={2} className='text-center'>
              {t('noParticipants')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { ParticipantsTable };
