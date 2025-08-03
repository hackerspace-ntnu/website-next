import type { Translations } from '@/lib/locale';
import { editEventSchema } from '@/validations/events/editEventSchema';

function createEventSchema(t: Translations) {
  return editEventSchema(t, true);
}

export { createEventSchema };
