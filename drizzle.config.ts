import { defineConfig } from 'drizzle-kit';

import { env } from '@/env';

const connectionString = `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`;

export default defineConfig({
  schema: './src/server/db/schema/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
});
