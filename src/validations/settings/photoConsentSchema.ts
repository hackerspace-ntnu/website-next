import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function photoConsentSchema(t: Translations) {
  return z.object({
    photoConsentSetting: z.boolean({
      message: t('settings.profile.photoConsent.invalid'),
    }),
  });
}

export { photoConsentSchema };
