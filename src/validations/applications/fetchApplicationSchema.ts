import z from 'zod';
import type { Translations } from '@/lib/locale';

function fetchApplicationSchema(t: Translations) {
  return z.object({
    applicationId: z.number().min(1, t('applications.api.invalidId')),
  });
}

export { fetchApplicationSchema };
