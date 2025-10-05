import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { ruleSchema } from '@/validations/rules/ruleSchema';

function editRuleSchema(t: Translations) {
  return ruleSchema(t).extend({
    id: z.number(),
  });
}

export { editRuleSchema };
