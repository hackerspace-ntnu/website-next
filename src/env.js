import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    STORAGE_HOST: z.string(),
    STORAGE_PORT: z.string(),
    STORAGE_USER: z.string(),
    STORAGE_PASSWORD: z.string(),
    STORAGE_NAME: z.string(),
    FEIDE_CLIENT_ID: z.string(),
    FEIDE_CLIENT_SECRET: z.string(),
    FEIDE_AUTHORIZATION_ENDPOINT: z.string(),
    FEIDE_TOKEN_ENDPOINT: z.string(),
    FEIDE_USERINFO_ENDPOINT: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SITE_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    STORAGE_HOST: process.env.STORAGE_HOST,
    STORAGE_PORT: process.env.STORAGE_PORT,
    STORAGE_USER: process.env.STORAGE_USER,
    STORAGE_PASSWORD: process.env.STORAGE_PASSWORD,
    STORAGE_NAME: process.env.STORAGE_NAME,
    FEIDE_CLIENT_ID: process.env.FEIDE_CLIENT_ID,
    FEIDE_CLIENT_SECRET: process.env.FEIDE_CLIENT_SECRET,
    FEIDE_AUTHORIZATION_ENDPOINT: process.env.FEIDE_AUTHORIZATION_ENDPOINT,
    FEIDE_TOKEN_ENDPOINT: process.env.FEIDE_TOKEN_ENDPOINT,
    FEIDE_USERINFO_ENDPOINT: process.env.FEIDE_USERINFO_ENDPOINT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
