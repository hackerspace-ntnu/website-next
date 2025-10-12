import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import {
  applicationsRouter,
  authRouter,
  bannersRouter,
  eventsRouter,
  forgotPasswordRouter,
  groupsRouter,
  homeRouter,
  newsRouter,
  quotesRouter,
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
  applications: applicationsRouter,
  auth: authRouter,
  banners: bannersRouter,
  events: eventsRouter,
  forgotPassword: forgotPasswordRouter,
  groups: groupsRouter,
  home: homeRouter,
  news: newsRouter,
  quotes: quotesRouter,
  reservations: reservationsRouter,
  rules: rulesRouter,
  settings: settingsRouter,
  shiftSchedule: shiftScheduleRouter,
  skills: skillsRouter,
  storage: storageRouter,
  test: testRouter,
  tools: toolsRouter,
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
