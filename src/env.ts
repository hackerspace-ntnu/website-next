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
    S3_NAME: z.string(),
    FEIDE_CLIENT_ID: z.string().optional(),
    FEIDE_CLIENT_SECRET: z.string().optional(),
    FEIDE_AUTHORIZATION_ENDPOINT: z.string().optional(),
    FEIDE_TOKEN_ENDPOINT: z.string().optional(),
    FEIDE_USERINFO_ENDPOINT: z.string().optional(),
    FEIDE_EXTENDED_USERINFO_ENDPOINT: z.string().optional(),
    EMAIL_FROM_ADDRESS: z.string().email().optional(),
    EMAIL_FROM_PASSWORD: z.string().optional(),
    EMAIL_REPLY_TO: z.string().email().optional(),
    MATRIX_SERVER_NAME: z.string().optional(),
    MATRIX_SECRET: z.string().optional(),
    MATRIX_ENDPOINT: z.string().optional(),
    MATRIX_ACCESS_TOKEN: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SITE_URL: z.string(),
    NEXT_PUBLIC_MATRIX_CLIENT_URL: z.string().optional(),
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
    S3_NAME: process.env.S3_NAME,
    FEIDE_CLIENT_ID: process.env.FEIDE_CLIENT_ID,
    FEIDE_CLIENT_SECRET: process.env.FEIDE_CLIENT_SECRET,
    FEIDE_AUTHORIZATION_ENDPOINT: process.env.FEIDE_AUTHORIZATION_ENDPOINT,
    FEIDE_TOKEN_ENDPOINT: process.env.FEIDE_TOKEN_ENDPOINT,
    FEIDE_USERINFO_ENDPOINT: process.env.FEIDE_USERINFO_ENDPOINT,
    FEIDE_EXTENDED_USERINFO_ENDPOINT:
      process.env.FEIDE_EXTENDED_USERINFO_ENDPOINT,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    EMAIL_FROM_PASSWORD: process.env.EMAIL_FROM_PASSWORD,
    EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO,
    MATRIX_SERVER_NAME: process.env.MATRIX_SERVER_NAME,
    MATRIX_SECRET: process.env.MATRIX_SECRET,
    MATRIX_ENDPOINT: process.env.MATRIX_ENDPOINT,
    NEXT_PUBLIC_MATRIX_CLIENT_URL: process.env.NEXT_PUBLIC_MATRIX_CLIENT_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    MATRIX_ACCESS_TOKEN: process.env.MATRIX_ACCESS_TOKEN,
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
