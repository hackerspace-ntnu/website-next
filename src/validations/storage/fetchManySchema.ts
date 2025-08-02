import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchManySchema(t: Translations) {
  return z
    .object({
      limit: z.number().min(1).max(50),
      offset: z.number(),
      sorting: z
        .enum([
          t('storage.searchParams.name'),
          t('storage.searchParams.ascending'),
          t('storage.searchParams.descending'),
        ])
        .optional(),
      category: z.number().optional(),
      name: z.string().optional(),
    })
    .or(z.array(z.number()));
}

export { fetchManySchema };
