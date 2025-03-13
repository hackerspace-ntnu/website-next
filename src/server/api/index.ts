import {
  authRouter,
  settingsRouter,
  storageRouter,
  testRouter,
  utilsRouter,
} from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  storage: storageRouter,
  settings: settingsRouter,
  utils: utilsRouter,
});

const createCaller = createCallerFactory(router);

type RouterInput = inferRouterInputs<typeof router>;
type RouterOutput = inferRouterOutputs<typeof router>;

export { router, createCaller, type RouterInput, type RouterOutput };
