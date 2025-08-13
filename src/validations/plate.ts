import { z } from 'zod';

const baseElementSchema = z
  .object({
    type: z.string(),
  })
  .passthrough();

const textSchema = z
  .object({
    text: z.string(),
  })
  .passthrough();

type Text = z.infer<typeof textSchema>;

type Element = z.infer<typeof baseElementSchema> & {
  children: (Element | Text)[];
};

const elementSchema: z.ZodType<Element> = baseElementSchema.extend({
  children: z.lazy(() => z.union([elementSchema, textSchema]).array()),
});

const plateValueSchema = z.array(elementSchema);

export { plateValueSchema };
