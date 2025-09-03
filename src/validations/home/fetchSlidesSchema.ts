import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchSlidesSchema(t: Translations) {
  return z.object({
    onlyActive: z.boolean({ message: t('home.api.activeInvalid') }).optional(),
  });
}

export { fetchSlidesSchema };
