import { env } from '@/env';
import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  out: './src/server/db/migrations',
  schema: './src/server/db/tables/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
  },
});

export default config;
