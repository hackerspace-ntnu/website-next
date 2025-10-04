import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import {
  authRouter,
  eventsRouter,
  groupsRouter,
  newsRouter,
  reservationsRouter,
  rulesRouter,
  settingsRouter,
  shiftScheduleRouter,
  skillsRouter,
  storageRouter,
  testRouter,
  toolsRouter,
  usersRouter,
  utilsRouter,
} from '@/server/api/routers';
import { createCallerFactory, createRouter } from '@/server/api/trpc';

const router = createRouter({
  auth: authRouter,
  events: eventsRouter,
  skills: skillsRouter,
  groups: groupsRouter,
  rules: rulesRouter,
  settings: settingsRouter,
  shiftSchedule: shiftScheduleRouter,
  storage: storageRouter,
  test: testRouter,
  users: usersRouter,
  utils: utilsRouter,
  news: newsRouter,
  reservations: reservationsRouter,
  tools: toolsRouter,
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
