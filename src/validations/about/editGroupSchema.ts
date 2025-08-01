import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { groupSchema } from '@/validations/about/groupSchema';

function editGroupSchema(t: Translations) {
  return groupSchema(t).extend({
    id: z.number(),
  });
}

export { editGroupSchema };
