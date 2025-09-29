import z from 'zod';
import type { Translations } from '@/lib/locale';
import { applicationSchema } from '@/validations/applications/applicationSchema';

function sendApplicationSchema(t: Translations) {
  return applicationSchema(t).extend({
    studyYear: z
      .number()
      .min(1, t('applications.apply.studyYear.required'))
      .max(5, t('applications.apply.studyYear.invalidYear')),
  });
}

export { sendApplicationSchema };
