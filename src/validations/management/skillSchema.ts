import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function skillSchema(t: Translations) {
  return z.object({
    identifier: z
      .string()
      .min(1, t('management.skills.form.identifier.required'))
      .max(51, t('management.skills.form.identifier.maxLength', { count: 51 }))
      .regex(/^[a-zA-Z0-9]+$/, t('management.skills.form.identifier.regex')),
    nameNorwegian: z
      .string()
      .min(1, t('management.skills.form.name.required'))
      .max(51, t('management.skills.form.name.maxLength', { count: 51 })),
    nameEnglish: z
      .string()
      .min(1, t('management.skills.form.name.required'))
      .max(51, t('management.skills.form.name.maxLength', { count: 51 })),
  });
}

export { skillSchema };
