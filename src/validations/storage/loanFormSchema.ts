import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function loanFormSchema(t: Translations) {
  return z.object({
    returnBy: z.date().min(new Date(), t('storage.loanForm.dateInFuture')),
  });
}

export { loanFormSchema };
