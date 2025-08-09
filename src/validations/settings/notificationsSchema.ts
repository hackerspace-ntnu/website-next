import { z } from 'zod';

function notificationsSchema() {
  return z.object({
    notifications: z.enum(['all', 'useful', 'essential']),
  });
}

export { notificationsSchema };
