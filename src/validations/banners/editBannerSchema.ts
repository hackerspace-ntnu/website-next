import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { bannerSchema } from '@/validations/banners/bannerSchema';

function editBannerSchema(t: Translations) {
  return bannerSchema(t).extend({
    id: z.number({ message: t('management.banners.api.invalidId') }),
  });
}

export { editBannerSchema };
