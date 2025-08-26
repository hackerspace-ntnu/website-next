'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { RouterOutput } from '@/server/api';

function AttendanceCheckbox({
  participant,
  event,
}: {
  participant: RouterOutput['events']['fetchEventParticipants'][number];
  event: NonNullable<RouterOutput['events']['fetchEvent']>;
}) {
  const t = useTranslations('events.attendance');
  const router = useRouter();
  const setParticipantAttendance =
    api.events.setParticipantAttendance.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  return (
    <>
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
      <Label className='whitespace-nowrap'>
        {participant.attended ? t('present') : t('absent')}
      </Label>
    </>
  );
}

export { AttendanceCheckbox };
