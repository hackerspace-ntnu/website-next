import { env } from '@/env';
import { db } from '@/server/db';
import { sessions, users } from '@/server/db/schema';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
      name: attributes.name,
    };
  },
});

export * from './user';

// IMPORTANT!
declare module 'lucia' {
  // Has to be an interface
  interface Register {
    Lucia: typeof auth;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseUserAttributes = {
  username: string;
  name: string;
};
