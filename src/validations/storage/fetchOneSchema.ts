import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function fetchOneSchema(t: Translations) {
  return z.number({
    message: t('storage.item.invalidId'),
  });
}

export { fetchOneSchema };
