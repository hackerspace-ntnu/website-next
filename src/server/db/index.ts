import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env';
import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  connection: postgres.Sql | undefined;
};

const connectionString = `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`;

const connection = globalForDb.connection ?? postgres(connectionString);
if (env.NODE_ENV !== 'production') globalForDb.connection = connection;

export const db = drizzle(connection, { schema });
