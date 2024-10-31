import { testRouter } from '@/server/api/routers/test';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  test: testRouter,
});

const createCaller = createCallerFactory(router);

export { router, createCaller };
