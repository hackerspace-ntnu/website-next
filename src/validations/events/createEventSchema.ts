import z from 'zod';
import type { Translations } from '@/lib/locale';
import { eventSchema } from '@/validations/events/eventSchema';

function createEventSchema(t: Translations) {
  return eventSchema(t)
    .extend({
      // If we're creating a new event, the start time must be in the future
      // When editing, the start time can be in the past
      startTime: z
        .date({ message: t('events.form.startTime.required') })
        .refine((date) => date > new Date(), {
          message: t('events.form.startTime.timeInPast'),
        }),
    })
    .refine((data) => !data.setMaxParticipants || data.maxParticipants > 0, {
      message: t('events.form.maxParticipants.positive'),
      path: ['maxParticipants'],
    })
    .refine((data) => data.endTime > data.startTime, {
      message: t('events.form.endTime.dateBeforeStart'),
      path: ['endTime'],
    })
    .refine(
      (data) =>
        !data.setSignUpDeadline ||
        !data.signUpDeadline ||
        data.signUpDeadline > new Date(),
      {
        message: t('events.form.signUpDeadline.timeInPast'),
        path: ['signUpDeadline'],
      },
    )
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

export { createEventSchema };
