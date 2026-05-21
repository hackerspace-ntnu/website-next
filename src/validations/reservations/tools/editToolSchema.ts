import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { toolSchema } from '@/validations/reservations/tools/toolSchema';

function editToolSchema(t: Translations) {
  return toolSchema(t).extend({
    id: z
      .number({ error: t('reservations.api.invalidId') })
      .int()
      .positive(),
  });
}

export { editToolSchema };
