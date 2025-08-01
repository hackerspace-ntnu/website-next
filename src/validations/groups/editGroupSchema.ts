import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { groupSchema } from '@/validations/groups/groupSchema';

function editGroupSchema(t: Translations) {
  return groupSchema(t).extend({
    id: z.number(),
  });
}

export { editGroupSchema };
