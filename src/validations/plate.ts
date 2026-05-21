import { z } from 'zod';

const textSchema = z.looseObject({
  text: z.string(),
});

const elementSchema = z.looseObject({
  type: z.string(),
  get children() {
    return z.array(z.union([elementSchema, textSchema]));
  },
});

const plateValueSchema = z.array(elementSchema);

export { plateValueSchema };
