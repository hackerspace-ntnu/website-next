import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchNewsArticlesSchema(t: Translations) {
  return z.object({
    limit: z
      .number()
      .min(1, t('news.api.invalidLimit'))
      .max(20, t('news.api.tooManyArticles', { count: 20 })),
    offset: z.number().min(0, t('news.api.invalidOffset')),
  });
}

export { fetchNewsArticlesSchema };
