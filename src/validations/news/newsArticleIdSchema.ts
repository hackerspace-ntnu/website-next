import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function newsArticleIdSchema(t: Translations) {
  return z.number().min(1, t('news.api.invalidId'));
}

export { newsArticleIdSchema };
