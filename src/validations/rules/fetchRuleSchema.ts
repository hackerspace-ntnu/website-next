import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchRuleSchema(t: Translations) {
  return z.number().min(1, t('rules.api.invalidRuleId'));
}

export { fetchRuleSchema };
