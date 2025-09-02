import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import {
  authRouter,
  eventsRouter,
  groupsRouter,
  homeRouter,
  newsRouter,
  settingsRouter,
  shiftScheduleRouter,
  skillsRouter,
  storageRouter,
  testRouter,
  usersRouter,
  utilsRouter,
} from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  auth: authRouter,
  home: homeRouter,
  groups: groupsRouter,
  events: eventsRouter,
  settings: settingsRouter,
  shiftSchedule: shiftScheduleRouter,
  skills: skillsRouter,
  storage: storageRouter,
  test: testRouter,
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
