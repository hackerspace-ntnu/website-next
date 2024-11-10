import { env } from '@/env';
import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  schema: './src/server/db/schema/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`,
  },
});

export default config;
