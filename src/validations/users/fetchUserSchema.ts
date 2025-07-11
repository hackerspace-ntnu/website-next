import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function fetchUserSchema(t: Translations) {
  return z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
    })
    .refine((data) => data.id !== undefined || data.name !== undefined, {
      message: t('members.api.idOrNameRequired'),
    });
}

export { fetchUserSchema };
