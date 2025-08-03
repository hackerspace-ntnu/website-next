'use client';

import { useTranslations } from 'next-intl';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function ParticipantsTable({
  participants,
  event,
}: {
  participants: RouterOutput['events']['fetchEventParticipants'];
  event: NonNullable<RouterOutput['events']['fetchEvent']>;
}) {
  const router = useRouter();
  const t = useTranslations('events.attendance');
  const setParticipantAttendance =
    api.events.setParticipantAttendance.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  return (
    <Table>
      <TableCaption>{t('attendeesList')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-full'>{t('member')}</TableHead>
          <TableHead>{t('attendance')}</TableHead>
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
                <Checkbox
                  checked={participant.attended}
                  className='cursor-pointer'
                  onClick={() => {
                    if (event.startTime > new Date()) {
                      return toast.error(t('notStartedYet'));
                    }
                    toast.promise(
                      setParticipantAttendance.mutateAsync({
                        eventId: event.id,
                        userId: participant.userId,
                        attended: !participant.attended,
                      }),
                      {
                        loading: t('updating', {
                          name: `${participant.user.firstName} ${participant.user.lastName}`,
                        }),
                        success: t('success', {
                          name: `${participant.user.firstName} ${participant.user.lastName}`,
                        }),
                        error: t('error', {
                          name: `${participant.user.firstName} ${participant.user.lastName}`,
                        }),
                      },
                    );
                  }}
                />
                <Label>
                  {participant.attended ? t('present') : t('absent')}
                </Label>
              </div>
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
