import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { selectSlideSchema } from '@/validations/home/fetchSlideSchema';

function changeSlideActiveSchema(t: Translations) {
  return selectSlideSchema(t).extend({
    active: z.boolean({ message: t('home.api.activeInvalid') }),
  });
}

export { changeSlideActiveSchema };
