import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import {
  aboutRouter,
  authRouter,
  settingsRouter,
  shiftScheduleRouter,
  storageRouter,
  testRouter,
  utilsRouter,
} from '@/server/api/routers';
import { usersRouter } from '@/server/api/routers/users';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  test: testRouter,
  about: aboutRouter,
  auth: authRouter,
  storage: storageRouter,
  shiftSchedule: shiftScheduleRouter,
  settings: settingsRouter,
  users: usersRouter,
  utils: utilsRouter,
});

const createCaller = createCallerFactory(router);

type RouterInput = inferRouterInputs<typeof router>;
type RouterOutput = inferRouterOutputs<typeof router>;

type RouterInputs = inferRouterInputs<typeof router>;
type RouterOutputs = inferRouterOutputs<typeof router>;

export {
  router,
  createCaller,
  type RouterInput,
  type RouterOutput,
  type RouterInputs,
  type RouterOutputs,
};
