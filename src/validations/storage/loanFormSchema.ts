import { startOfDay } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function loanFormSchema(t: Translations) {
  return z.object({
    dates: z.object({
      from: z
        .date()
        .min(startOfDay(new Date()), t('storage.loanForm.dateInFuture')),
      to: z
        .date()
        .min(startOfDay(new Date()), t('storage.loanForm.dateInFuture')),
    }),
    autoapprove: z.boolean(),
  });
}

export { loanFormSchema };
