import { createInsertSchema } from 'drizzle-zod';

import { quotes, users } from '@/server/db/tables';

const insertUserSchema = createInsertSchema(users);

const insertQuoteSchema = createInsertSchema(quotes);

export { insertUserSchema, insertQuoteSchema };
