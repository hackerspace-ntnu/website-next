import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchOneSchema(t: Translations) {
  return z.number({
    message: t('storage.item.invalidId'),
  });
}

export { fetchOneSchema };
