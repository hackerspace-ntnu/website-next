import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import {
  authRouter,
  eventsRouter,
  groupsRouter,
  settingsRouter,
  shiftScheduleRouter,
  storageRouter,
  testRouter,
  utilsRouter,
} from '@/server/api/routers';
import { skillsRouter } from '@/server/api/routers/skills';
import { usersRouter } from '@/server/api/routers/users';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  auth: authRouter,
  groups: groupsRouter,
  events: eventsRouter,
  settings: settingsRouter,
  shiftSchedule: shiftScheduleRouter,
  skills: skillsRouter,
  storage: storageRouter,
  test: testRouter,
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
