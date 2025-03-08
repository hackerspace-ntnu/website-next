import { authRouter, storageRouter, testRouter } from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  storage: storageRouter,
});

const createCaller = createCallerFactory(router);

type RouterInput = inferRouterInputs<typeof router>;
type RouterOutput = inferRouterOutputs<typeof router>;

export { router, createCaller, type RouterInput, type RouterOutput };
