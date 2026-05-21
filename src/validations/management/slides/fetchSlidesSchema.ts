import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchSlidesSchema(t: Translations) {
  return z.object({
    onlyActive: z
      .boolean({ error: t('management.slides.api.activeInvalid') })
      .optional(),
  });
}

export { fetchSlidesSchema };
