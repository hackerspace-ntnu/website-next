import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { plateValueSchema } from '@/validations/plate';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function ruleSchema(t: Translations) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 10,
      sizeLimitError: t('rules.form.image.sizeLimitError', { size: 10 }),
      wrongFileTypeError: t('rules.form.image.wrongFileTypeError'),
      fileNotImageError: t('rules.form.image.fileNotImageError'),
      optional: true,
    }),
    nameNorwegian: z.string().min(1, t('rules.form.name.required')),
    nameEnglish: z.string().min(1, t('rules.form.name.required')),
    contentNorwegian: plateValueSchema,
    contentEnglish: plateValueSchema,
    internal: z.boolean(),
  });
}

export { ruleSchema };
