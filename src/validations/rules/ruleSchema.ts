import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function ruleSchema(t: Translations) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 5,
      sizeLimitError: t('rules.form.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('rules.form.image.wrongFileTypeError'),
      fileNotImageError: t('rules.form.image.fileNotImageError'),
      optional: true,
    }),
    nameNorwegian: z.string().min(1, t('rules.form.name.required')),
    nameEnglish: z.string().min(1, t('rules.form.name.required')),
    contentNorwegian: z.string().min(1, t('rules.form.content.required')),
    contentEnglish: z.string().min(1, t('rules.form.content.required')),
    internal: z.boolean(),
  });
}

export { ruleSchema };
