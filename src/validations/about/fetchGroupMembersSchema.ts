import { z } from 'zod';

function fetchGroupMembersSchema() {
  return z.number().min(1);
}

export { fetchGroupMembersSchema };
