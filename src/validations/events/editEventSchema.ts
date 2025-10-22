import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { eventSchema } from '@/validations/events/eventSchema';

function editEventSchema(t: Translations) {
  return eventSchema(t)
    .extend({
      id: z.number(),
      startTime: z.date({ message: t('events.form.startTime.required') }),
    })
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

export { editEventSchema };
