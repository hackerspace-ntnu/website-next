import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function newsArticleSchema(t: Translations) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 5,
      sizeLimitError: t('news.form.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('news.form.image.wrongFileTypeError'),
      fileNotImageError: t('news.form.image.fileNotImageError'),
      optional: true,
    }),
    titleNorwegian: z.string().min(1, t('news.form.title.required')),
    titleEnglish: z.string().min(1, t('news.form.title.required')),
    contentNorwegian: z.string().min(1, t('news.form.content.required')),
    contentEnglish: z.string().min(1, t('news.form.content.required')),
    internal: z.boolean(),
  });
}

export { newsArticleSchema };
