import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    S3_HOST: z.string(),
    S3_PORT: z.string(),
    S3_USER: z.string(),
    S3_PASSWORD: z.string(),
    S3_BUCKETS: z.string(),
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
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    S3_HOST: process.env.S3_HOST,
    S3_PORT: process.env.S3_PORT,
    S3_USER: process.env.S3_USER,
    S3_PASSWORD: process.env.S3_PASSWORD,
    S3_BUCKETS: process.env.S3_BUCKETS,
    FEIDE_CLIENT_ID: process.env.FEIDE_CLIENT_ID,
    FEIDE_CLIENT_SECRET: process.env.FEIDE_CLIENT_SECRET,
    FEIDE_AUTHORIZATION_ENDPOINT: process.env.FEIDE_AUTHORIZATION_ENDPOINT,
    FEIDE_TOKEN_ENDPOINT: process.env.FEIDE_TOKEN_ENDPOINT,
    FEIDE_USERINFO_ENDPOINT: process.env.FEIDE_USERINFO_ENDPOINT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
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
