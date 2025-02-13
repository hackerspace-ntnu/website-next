import {
  authRouter,
  settingsRouter,
  testRouter,
  utilsRouter,
} from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  settings: settingsRouter,
  utils: utilsRouter,
});

const createCaller = createCallerFactory(router);

export { router, createCaller };
