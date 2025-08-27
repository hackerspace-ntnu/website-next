import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function skillSchema(t: Translations) {
  return z.object({
    identifier: z
      .string()
      .min(1, t('management.skills.form.identifier.required'))
      .regex(/^[a-zA-Z0-9]+$/, t('management.skills.form.identifier.regex')),
    nameNorwegian: z.string().min(1, t('management.skills.form.name.required')),
    nameEnglish: z.string().min(1, t('management.skills.form.name.required')),
  });
}

export { skillSchema };
