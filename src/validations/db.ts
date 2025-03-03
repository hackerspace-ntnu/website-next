import { createInsertSchema } from 'drizzle-zod';

import { users } from '@/server/db/tables';

const insertUserSchema = createInsertSchema(users);

export { insertUserSchema };
