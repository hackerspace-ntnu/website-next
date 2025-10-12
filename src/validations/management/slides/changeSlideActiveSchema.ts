import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { selectSlideSchema } from '@/validations/management/slides/fetchSlideSchema';

function changeSlideActiveSchema(t: Translations) {
  return selectSlideSchema(t).extend({
    active: z.boolean({ message: t('management.slides.api.activeInvalid') }),
  });
}

export { changeSlideActiveSchema };
