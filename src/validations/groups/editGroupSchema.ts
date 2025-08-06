import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { groupSchema } from '@/validations/groups/groupSchema';

function editGroupSchema(t: Translations) {
  return groupSchema(t).extend({
    id: z.number(),
    previousIdentifier: z
      .string()
      .min(1, t('groups.form.identifier.required'))
      .regex(/^[a-zA-Z0-9_.\-~]+$/, t('groups.form.identifier.regex'))
      .refine(
        (value) => value !== 'new',
        t('groups.form.identifier.isReserved'),
      ),
  });
}

export { editGroupSchema };
