import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function selectSlideSchema(t: Translations) {
  return z.object({
    id: z.number({ message: t('home.api.invalidId') }),
  });
}

export { selectSlideSchema };
