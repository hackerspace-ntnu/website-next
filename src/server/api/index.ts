import { authRouter, storageRouter, testRouter } from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  storage: storageRouter,
});

const createCaller = createCallerFactory(router);

export { router, createCaller };
