import type { Translations } from '@/lib/locale';
import { groupSchema } from '@/validations/about/groupSchema';
import { z } from 'zod';

function editGroupSchema(t: Translations) {
  return groupSchema(t).extend({
    id: z.number(),
  });
}

export { editGroupSchema };
