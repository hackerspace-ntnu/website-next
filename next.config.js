import nextIntl from 'next-intl/plugin';

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');
const withNextIntl = nextIntl('./src/i18n.ts');

/** @type {import("next").NextConfig} */
export default withNextIntl({});
