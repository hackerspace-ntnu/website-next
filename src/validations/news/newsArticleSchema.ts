import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { plateValueSchema } from '@/validations/plate';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function newsArticleSchema(t: Translations) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png', 'gif', 'webp'],
      maxFileSize: 50,
      sizeLimitError: t('news.form.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('news.form.image.wrongFileTypeError'),
      fileNotImageError: t('news.form.image.fileNotImageError'),
      optional: true,
    }),
    titleNorwegian: z.string().min(1, t('news.form.title.required')),
    titleEnglish: z.string().min(1, t('news.form.title.required')),
    preambleNorwegian: z.string().min(1, t('news.form.preamble.required')),
    preambleEnglish: z.string().min(1, t('news.form.preamble.required')),
    contentNorwegian: plateValueSchema,
    contentEnglish: plateValueSchema,
    internal: z.boolean(),
  });
}

export { newsArticleSchema };
