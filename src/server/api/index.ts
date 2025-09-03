import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import {
  authRouter,
  groupsRouter,
  newsRouter,
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
  auth: authRouter,
  groups: groupsRouter,
  storage: storageRouter,
  shiftSchedule: shiftScheduleRouter,
  settings: settingsRouter,
  users: usersRouter,
  utils: utilsRouter,
  news: newsRouter,
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
