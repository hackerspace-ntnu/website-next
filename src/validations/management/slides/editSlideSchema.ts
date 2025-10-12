import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { slideSchema } from '@/validations/management/slides/slideSchema';

function editSlideSchema(t: Translations) {
  return slideSchema(t).extend({
    id: z.number({ message: t('management.slides.api.invalidId') }),
  });
}

export { editSlideSchema };
