import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { eventSchema } from '@/validations/events/eventSchema';

function editEventSchema(t: Translations) {
  return eventSchema(t)
    .extend({
      id: z.number(),
      startTime: z.date({ error: t('events.form.startTime.required') }),
    })
    .refine((data) => !data.setMaxParticipants || data.maxParticipants > 0, {
      error: t('events.form.maxParticipants.positive'),
      path: ['maxParticipants'],
    })
    .refine((data) => data.endTime > data.startTime, {
      error: t('events.form.endTime.dateBeforeStart'),
      path: ['endTime'],
    })
    .refine(
      (data) =>
        !data.setSignUpDeadline ||
        !data.signUpDeadline ||
        data.signUpDeadline < data.startTime,
      {
        error: t('events.form.signUpDeadline.beforeStartTime'),
        path: ['signUpDeadline'],
      },
    );
}

export { editEventSchema };
