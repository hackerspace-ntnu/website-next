import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { plateValueSchema } from '@/validations/plate';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function eventSchema(t: Translations) {
  return z.object({
    nameNorwegian: z
      .string()
      .min(1, t('events.form.nameNorwegian.required'))
      .max(63, t('events.form.nameNorwegian.maxLength', { count: 63 })),
    nameEnglish: z
      .string()
      .min(1, t('events.form.nameEnglish.required'))
      .max(63, t('events.form.nameEnglish.maxLength', { count: 63 })),
    summaryNorwegian: z
      .string()
      .min(1, t('events.form.summaryNorwegian.required'))
      .max(255, t('events.form.summaryNorwegian.maxLength', { count: 255 })),
    summaryEnglish: z
      .string()
      .min(1, t('events.form.summaryEnglish.required'))
      .max(255, t('events.form.summaryEnglish.maxLength', { count: 255 })),
    descriptionNorwegian: plateValueSchema,
    descriptionEnglish: plateValueSchema,
    locationNorwegian: z
      .string()
      .min(1, t('events.form.locationNorwegian.required'))
      .max(255, t('events.form.locationNorwegian.maxLength', { count: 255 })),
    locationEnglish: z
      .string()
      .min(1, t('events.form.locationEnglish.required'))
      .max(255, t('events.form.locationEnglish.maxLength', { count: 255 })),
    startTime: z.date({ message: t('events.form.startTime.required') }),
    setSignUpDeadline: z.boolean(),
    signUpDeadline: z.date().nullable(),
    endTime: z.date({ message: t('events.form.endTime.required') }),
    locationMapLink: z
      .string()
      .url(t('events.form.locationMapLink.invalid'))
      .or(z.literal('')),
    internal: z.boolean(),
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png', 'gif', 'webp'],
      maxFileSize: 50,
      sizeLimitError: t('events.form.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('events.form.image.wrongFileTypeError'),
      fileNotImageError: t('events.form.image.fileNotImageError'),
      optional: true,
    }),
    skill: z.string(),
  });
}

export { eventSchema };
