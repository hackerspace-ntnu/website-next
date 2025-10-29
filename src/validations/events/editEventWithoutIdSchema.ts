import type { Translations } from '@/lib/locale';
import { eventSchema } from '@/validations/events/eventSchema';

function editEventWithoutIdSchema(t: Translations) {
  return eventSchema(t)
    .refine((data) => data.endTime > data.startTime, {
      message: t('events.form.endTime.dateBeforeStart'),
      path: ['endTime'],
    })
    .refine(
      (data) =>
        !data.setSignUpDeadline ||
        !data.signUpDeadline ||
        data.signUpDeadline < data.startTime,
      {
        message: t('events.form.signUpDeadline.beforeStartTime'),
        path: ['signUpDeadline'],
      },
    );
}

export { editEventWithoutIdSchema };
