import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function selectNewsArticleSchema(t: Translations) {
  return z.object({
    id: z.number().min(1, t('news.api.invalidId')),
    incrementViews: z.boolean().optional(),
  });
}

export { selectNewsArticleSchema };
