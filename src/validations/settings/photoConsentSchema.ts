import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function photoConsentSchema(t: Translations) {
  return z.object({
    photoConsent: z.boolean({
      error: t('settings.profile.photoConsent.invalid'),
    }),
  });
}

export { photoConsentSchema };
