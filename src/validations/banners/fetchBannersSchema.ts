import { z } from 'zod';
import { bannerPages } from '@/lib/constants';

function fetchBannersSchema() {
  return z.object({
    path: z.enum(bannerPages),
  });
}

export { fetchBannersSchema };
