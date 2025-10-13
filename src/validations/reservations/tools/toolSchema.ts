import { z } from 'zod';
import { toolStatus, tooltype } from '@/lib/constants';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function toolSchema(t: Translations) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 50,
      sizeLimitError: t('reservations.tools.form.image.sizeLimitError', {
        size: 50,
      }),
      wrongFileTypeError: t('reservations.tools.form.image.wrongFileTypeError'),
      fileNotImageError: t('reservations.tools.form.image.fileNotImageError'),
      optional: true,
    }),
    type: z.enum(tooltype),
    nameEnglish: z
      .string()
      .max(128, t('reservations.tools.form.name.maxLength', { count: 128 })),
    nameNorwegian: z
      .string()
      .max(128, t('reservations.tools.form.name.maxLength', { count: 128 })),
    nickName: z
      .string()
      .max(
        128,
        t('reservations.tools.form.nickName.maxLength', { count: 128 }),
      ),
    descriptionEnglish: z
      .string()
      .max(
        1024,
        t('reservations.tools.form.description.maxLength', { count: 1024 }),
      ),
    descriptionNorwegian: z
      .string()
      .max(
        1024,
        t('reservations.tools.form.description.maxLength', { count: 1024 }),
      ),
    requires: z
      .string()
      .max(
        256,
        t('reservations.tools.form.requires.maxLength', { count: 256 }),
      ),
    status: z.enum(toolStatus),
    difficulty: z.coerce.number().min(1).max(5),
    filamentSize: z
      .string()
      .max(
        32,
        t('reservations.tools.form.filamentSize.maxLength', { count: 32 }),
      ),
    filamentType: z
      .string()
      .max(
        64,
        t('reservations.tools.form.filamentType.maxLength', { count: 64 }),
      ),
    slicer: z
      .string()
      .max(64, t('reservations.tools.form.slicer.maxLength', { count: 64 })),
  });
}

export { toolSchema };
