import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { drinkTypeEnum } from '@/server/db/tables';

function addCoffeeEntrySchema(t: Translations) {
  return z.object({
    drinkType: z.enum(drinkTypeEnum.enumValues, {
      message: t('coffeeScanner.api.invalidDrinkType'),
    }),
    cardId: z.string().min(1).max(32),
  });
}

export { addCoffeeEntrySchema };
