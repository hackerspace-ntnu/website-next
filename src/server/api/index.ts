import { authRouter, settingsRouter, testRouter } from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  settings: settingsRouter,
});

const createCaller = createCallerFactory(router);

export { router, createCaller };
