import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchOneSchema(t: Translations) {
  return z.number({
    error: t('storage.item.invalidId'),
  });
}

export { fetchOneSchema };
