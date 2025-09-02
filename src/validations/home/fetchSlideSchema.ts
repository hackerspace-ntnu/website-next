import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchSlideSchema(t: Translations) {
  return z.number({ message: t('home.api.invalidId') });
}

export { fetchSlideSchema };
