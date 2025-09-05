import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { slideSchema } from '@/validations/home/slideSchema';

function editSlideSchema(t: Translations) {
  return slideSchema(t).extend({
    id: z.number({ message: t('home.api.invalidId') }),
  });
}

export { editSlideSchema };
