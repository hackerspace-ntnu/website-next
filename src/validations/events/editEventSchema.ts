import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function editEventSchema(t: Translations, withId = false) {
  const fields = {
    nameNorwegian: z.string().min(1, t('events.form.nameNorwegian.required')),
    nameEnglish: z.string().min(1, t('events.form.nameEnglish.required')),
    summaryNorwegian: z
      .string()
      .min(1, t('events.form.summaryNorwegian.required')),
    summaryEnglish: z.string().min(1, t('events.form.summaryEnglish.required')),
    descriptionNorwegian: z
      .string()
      .min(1, t('events.form.descriptionNorwegian.required')),
    descriptionEnglish: z
      .string()
      .min(1, t('events.form.descriptionEnglish.required')),
    locationNorwegian: z
      .string()
      .min(1, t('events.form.locationNorwegian.required')),
    locationEnglish: z
      .string()
      .min(1, t('events.form.locationEnglish.required')),
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
    skill: z.string(),
  };

  return z
    .object(withId ? { ...fields, id: z.number() } : fields)
    .refine((data) => data.endTime > data.startTime, {
      message: t('events.form.endTime.dateBeforeStart'),
      path: ['endTime'],
    });
}

export { editEventSchema };
