import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchNewsArticleSchema(t: Translations) {
  return z.number().min(1, t('news.api.invalidId'));
}

export { fetchNewsArticleSchema };
