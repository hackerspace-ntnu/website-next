import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { newsArticleSchema } from '@/validations/news/newsArticleSchema';

function editNewsArticleSchema(t: Translations) {
  return newsArticleSchema(t).extend({
    id: z
      .number({ message: t('news.api.invalidId') })
      .min(1, t('news.api.invalidId')),
  });
}

export { editNewsArticleSchema };
