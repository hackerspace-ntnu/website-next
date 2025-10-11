import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function selectBannerSchema(t: Translations) {
  return z.object({
    id: z.number({ message: t('management.banners.api.invalidId') }),
  });
}

export { selectBannerSchema };
