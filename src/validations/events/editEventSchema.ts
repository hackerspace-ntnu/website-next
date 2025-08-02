import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function editEventSchema(t: Translations) {
  return z
    .object({
      nameNorwegian: z.string().min(1, t('events.form.nameNorwegian.required')),
      nameEnglish: z.string().min(1, t('events.form.nameEnglish.required')),
      summaryNorwegian: z.string(),
      summaryEnglish: z.string(),
      descriptionNorwegian: z.string(),
      descriptionEnglish: z.string(),
      locationNorwegian: z.string(),
      locationEnglish: z.string(),
      startTime: z
        .date({ message: t('events.form.startTime.required') })
        .refine((date) => date > new Date(), {
          message: t('events.form.startTime.timeInPast'),
        }),
      endTime: z.date({ message: t('events.form.endTime.required') }),
      locationMapLink: z
        .string()
        .url(t('events.form.locationMapLink.invalid'))
        .or(z.literal('')),
      internal: z.boolean(),
      image: fileUploadZodString({
        allowedMediaType: 'image',
        allowedFileTypes: ['jpeg', 'png'],
        maxFileSize: 50,
        sizeLimitError: t('events.form.image.sizeLimitError', { size: 50 }),
        wrongFileTypeError: t('events.form.image.wrongFileTypeError'),
        fileNotImageError: t('events.form.image.fileNotImageError'),
        optional: true,
      }),
    })
    .refine((data) => data.endTime > data.startTime, {
      message: t('events.form.endTime.dateBeforeStart'),
      path: ['endTime'],
    });
}

export { editEventSchema };
