import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { selectBannerSchema } from '@/validations/banners/selectBannerSchema';

function changeBannerActiveSchema(t: Translations) {
  return selectBannerSchema(t).extend({
    active: z.boolean({ error: t('management.banners.api.activeInvalid') }),
  });
}

export { changeBannerActiveSchema };
