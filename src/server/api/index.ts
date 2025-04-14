import {
  authRouter,
  settingsRouter,
  shiftScheduleRouter,
  testRouter,
  utilsRouter,
} from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

const router = createRouter({
  test: testRouter,
  auth: authRouter,
  shiftSchedule: shiftScheduleRouter,
  settings: settingsRouter,
  utils: utilsRouter,
});

const createCaller = createCallerFactory(router);

type RouterInputs = inferRouterInputs<typeof router>;
type RouterOutputs = inferRouterOutputs<typeof router>;

export { router, createCaller, type RouterInputs, type RouterOutputs };
